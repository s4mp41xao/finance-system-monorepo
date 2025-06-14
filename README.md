# Bank Account Management API

A Spring Boot REST API for managing bank accounts associated with companies and users.

## Features

- Create bank accounts linked to companies
- List all bank accounts for a company
- List all bank accounts for a user
- Delete bank accounts by ID

## Technologies

- Java 21
- Spring Boot
- Maven
- JPA/Hibernate

## Getting Started

### Prerequisites

- Java 21+
- Maven 3.8+
- A running database (MySQL, H2)

### Setup

1. Clone the repository:

2. Configure your database in `src/main/resources/application.properties`.

3. Build and run the application:

## API Endpoints

- `POST /bank-accounts` - Create a new bank account
- `GET /bank-accounts/company/{companyId}` - List all bank accounts for a company
- `GET /bank-accounts/user/{userId}` - List all bank accounts for a user
- `DELETE /bank-accounts/{id}` - Delete a bank account by ID

## Project Structure

- `model/` - Entity classes
- `repository/` - Spring Data JPA repositories
- `service/` - Business logic
- `controller/` - REST controllers
- `DTO/` - Data Transfer Objects
- `mapper/` - Entity-DTO mappers

## License

This project is licensed under the MIT License.
