package com.vasic.project_board.controller;

import com.vasic.project_board.domain.User;
import com.vasic.project_board.payload.JWTLoginSuccessResponse;
import com.vasic.project_board.payload.LoginRequest;
import com.vasic.project_board.security.JwtTokenProvider;
import com.vasic.project_board.service.UserService;
import com.vasic.project_board.service.ValidationErrorService;
import com.vasic.project_board.validator.UserValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;

import static com.vasic.project_board.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final ValidationErrorService errorService;
    private final UserService userService;
    private final UserValidator userValidator;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    UserController(ValidationErrorService errorService, UserService userService, UserValidator userValidator,
                   JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.errorService = errorService;
        this.userService = userService;
        this.userValidator = userValidator;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult) {
        ResponseEntity<?> errorMap = errorService.validateFields(bindingResult);
        if(errorMap != null) {
            return errorMap;
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult bindingResult) {

        // Validate pass match
        userValidator.validate(user, bindingResult);

        ResponseEntity<?> errorMap = errorService.validateFields(bindingResult);
        if(errorMap != null) {
            return errorMap;
        }

        User newUser = userService.saveUser(user);
        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }
}
