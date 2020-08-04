package com.vasic.project_board.service;

import com.vasic.project_board.domain.User;
import com.vasic.project_board.exceptions.UsernameUniqueException;
import com.vasic.project_board.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

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
