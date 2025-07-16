package com.example.spring34.__java_21;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@Testcontainers // Habilita o uso de Testcontainers com JUnit 5
class ApplicationTests {

	// Cria um container MySQL que será iniciado antes dos testes
	@Container
	static MySQLContainer<?> mySQLContainer = new MySQLContainer<>("mysql:8.0.26");

	// Este método injeta as propriedades do container (URL, user, pass)
	// no contexto do Spring ANTES que ele tente se conectar ao banco.
	@DynamicPropertySource
	static void dynamicProperties(DynamicPropertyRegistry registry) {
		registry.add("spring.datasource.url", mySQLContainer::getJdbcUrl);
		registry.add("spring.datasource.username", mySQLContainer::getUsername);
		registry.add("spring.datasource.password", mySQLContainer::getPassword);
		registry.add("spring.datasource.driver-class-name", mySQLContainer::getDriverClassName);

		// GERA UMA CHAVE SECRETA DO JWT PARA TESTES
		registry.add("api.security.token.secret", () -> "secret_key_para_testes");
	}

	@Test
	void contextLoads() {
		// Este teste agora vai rodar contra o banco de dados do container
		// e não dará mais o erro de autenticação.
	}
}
