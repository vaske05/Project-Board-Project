package com.vasic.project_board.security;

import com.vasic.project_board.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.vasic.project_board.security.SecurityConstants.EXPIRATION_TIME;
import static com.vasic.project_board.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {

    // Generate token

    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());

        Date nowDate = new Date(now.getTime());

        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", (userId));
        claims.put("username", user.getUsername());
        claims.put("fullname", user.getFullName());


        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();

    }

    // Validate token

    // Get user id from token
}
