package com.example.spring34.__java_21.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.spring34.__java_21.domain.user.User;
import com.example.spring34.__java_21.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    TokenService tokenService;
    @Autowired
    UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Extract the token from the Authorization header
        var token = this.recoverToken(request);

        // Validate the token and extract the user login (email)
        var login = tokenService.validateToken(token);

        if (login != null) {
            // Find the user in the database using the extracted email
            User user = userRepository.findByEmail(login)
                    .orElseThrow(() -> new RuntimeException("User Not Found"));

            // Decode the JWT token to extract the role claim
            DecodedJWT decodedJWT = JWT.decode(token);
            String role = decodedJWT.getClaim("role").asString();

            // Set the user’s authorities (roles) for Spring Security context
            var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));

            // Authenticate the user by setting the authentication in the security context
            var authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // Continue the filter chain (proceed with the request)
        filterChain.doFilter(request, response);
    }

    // Helper method to extract the token from the Authorization header
    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
