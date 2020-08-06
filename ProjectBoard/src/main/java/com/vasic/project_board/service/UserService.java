package com.vasic.project_board.service;

import com.vasic.project_board.domain.User;
import com.vasic.project_board.exceptions.UsernameUniqueException;
import com.vasic.project_board.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User saveUser(User user) {
        try {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setConfirmPassword("");

            return userRepository.save(user);
        } catch (Exception e) {
            // Handling if username already exists
            throw new UsernameUniqueException("Username: " + user.getUsername() + " already exists!" );
        }
    }
}
