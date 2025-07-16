# Estágio 1: Use uma imagem base do Java 17 (ou a versão que seu projeto usa)
FROM eclipse-temurin:21-jdk-jammy

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo .jar gerado pelo Maven/Gradle para o container
# Assumindo que você usa Maven. Se for Gradle, o caminho será 'build/libs/*.jar'
COPY target/*.jar app.jar

# Expõe a porta em que a aplicação Spring Boot roda
EXPOSE 8080

# Comando para executar a aplicação quando o container iniciar
ENTRYPOINT ["java","-jar","/app/app.jar"]