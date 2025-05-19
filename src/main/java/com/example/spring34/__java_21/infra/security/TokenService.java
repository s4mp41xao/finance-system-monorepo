package com.example.spring34.__java_21.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.spring34.__java_21.domain.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    // Método para gerar o token
    public String generateTokenWithRole(User user, String role) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            // Criar o token e adicionar o claim "role" com valor "USER"
            String token = JWT.create()
                    .withIssuer("login-auth-api")
                    .withSubject(user.getEmail())
                    .withClaim("role", role)  // Adiciona a role "USER"
                    .withExpiresAt(this.generateExpirationDate())
                    .sign(algorithm);

            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while authenticating");
        }
    }

    // Método para validar o token e retornar o email do usuário
    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            var verifier = JWT.require(algorithm)
                    .withIssuer("login-auth-api")
                    .build();

            // Verifica o token
            var decodedJWT = verifier.verify(token);

            String userEmail = decodedJWT.getSubject();
            String role = decodedJWT.getClaim("role").asString();

            // Valida se a role é "USER"
            if ("USER".equals(role)) {
                return userEmail;  // Retorna o email do usuário se a role for válida
            }

            return null;  // Caso a role não seja a esperada, retorna null
        } catch (JWTVerificationException exception) {
            return null;  // Caso o token seja inválido
        }
    }

    // Método para extrair a role do token
    public String getRoleFromToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("login-auth-api")
                    .build()
                    .verify(token)
                    .getClaim("role")  // Obtém o claim "role"
                    .asString();
        } catch (JWTVerificationException exception) {
            return null;  // Caso o token seja inválido ou não tenha a role
        }
    }

    // Método para gerar a data de expiração do token (2 horas)
    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
