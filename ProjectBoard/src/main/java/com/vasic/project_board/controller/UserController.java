package com.vasic.project_board.controller;

import com.vasic.project_board.domain.User;
import com.vasic.project_board.service.UserService;
import com.vasic.project_board.service.ValidationErrorService;
import com.vasic.project_board.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    ValidationErrorService errorService;

    @Autowired
    UserService userService;

    @Autowired
    UserValidator userValidator;

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
