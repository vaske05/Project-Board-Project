package com.vasic.project_board.security;

import com.vasic.project_board.domain.User;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.vasic.project_board.security.SecurityConstants.*;

@Component
public class JwtTokenProvider {



    /*
     * Method which generate token
     */
    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());

        Date expirationDate = generateExpirationDate();

        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", (userId));
        claims.put("username", user.getUsername());
        claims.put("fullname", user.getFullName());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    /*
     * Token validation
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        }
        catch (SignatureException ex) {
            System.out.println("Invalid JWT signature");
        }
        catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT token");
        }
        catch (ExpiredJwtException ex) {
            System.out.println("Expired JWT token");
        }
        catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT token");
        }
        catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty");
        }
        return false;
    }

    /*
     * Get user id from token
     */
    public Long getUserIdFromJwt(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String)(claims.get("id"));
        return Long.parseLong(id);
    }

    /*
     * Method which generate expiration date
     */
    public Date generateExpirationDate() {
        Calendar calendar = Calendar.getInstance();
        Date nowDate = new Date();
        calendar.setTime(nowDate);
        calendar.add(Calendar.HOUR, EXPIRATION_TIME_IN_HOURS);
        calendar.add(Calendar.HOUR, EXPIRATION_TIME_IN_MINUTES);

        return calendar.getTime();
    }
}
