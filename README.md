# Transactions Management API

A Spring Boot REST API for managing transactions associated with bank accounts, companies and users.

## Features

- Register and manage companies and users
- Create, list, and delete bank accounts linked to companies
- Retrieve all bank accounts associated with a specific company or user
- Perform, list, and delete financial transactions for bank accounts
- Update and manage company and user information
- Secure RESTful API endpoints with clear separation of concerns
- Built with Java 21, Spring Boot, and JPA/Hibernate for robust backend development

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

1. Clone the repository: https://github.com/s4mp41xao/jwt-login-and-register.git

2. Configure your database in `src/main/resources/application.properties`.

3. Build and run the application:

## API Endpoint

- **User**
  - `POST /users` — Create a new user
  - `GET /users` — List all users
  - `GET /users/{id}` — Get user details by ID
  - `PUT /users/{id}` — Update user information
  - `DELETE /users/{id}` — Delete a user by ID

- **Company**
  - `POST /companies` — Create a new company
  - `GET /companies` — List all companies
  - `GET /companies/{id}` — Get company details by ID
  - `PUT /companies/{id}` — Update company information
  - `DELETE /companies/{id}` — Delete a company by ID

- **Bank Accounts**
  - `POST /bank-accounts` — Create a new bank account
  - `GET /bank-accounts/company/{companyId}` — List all bank accounts for a company
  - `GET /bank-accounts/user/{userId}` — List all bank accounts for a user
  - `DELETE /bank-accounts/{id}` — Delete a bank account by ID

- **Transactions**
  - `POST /transactions` — Create a new transaction
  - `GET /transactions` — List all transactions
  - `GET /transactions/{id}` — Get transaction details by ID
  - `GET /transactions/account/{accountId}` — List all transactions for a specific bank account
  - `DELETE /transactions/{id}` — Delete a transaction by ID



## Project Structure

- `model/` - Entity classes
- `repository/` - Spring Data JPA repositories
- `service/` - Business logic
- `controller/` - REST controllers
- `DTO/` - Data Transfer Objects
- `mapper/` - Entity-DTO mappers

## License

This project is licensed under the MIT License.
