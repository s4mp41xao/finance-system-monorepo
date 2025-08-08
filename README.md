# Financial Management System - Contaki 📊

![Java](https://img.shields.io/badge/Java-21-blue?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-brightgreen?logo=spring)
![Angular](https://img.shields.io/badge/Angular-19-red?logo=angular)
![Azure](https://img.shields.io/badge/Azure-blue?logo=microsoftazure)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker)

This repository contains the source code for a complete web application designed to operate as a Software as a Service (SaaS) to solve the financial control challenges of small businesses. The platform centralizes the management of accounts, revenue and expense entries, and provides a clear view of the business's financial health.

## 🏛️ Architecture Overview

The project is structured as a **monorepo** to facilitate integrated development and maintenance of a robust backend in **Java/Spring Boot** and a reactive frontend in **Angular/TypeScript**. The entire solution has been containerized with **Docker** to ensure consistent environments, and it has been deployed to the **Azure** cloud using services like ACR, Azure Database for MySQL, and App Services.

## ✨ Key Features

-   **Secure Authentication:** JWT-based login and registration system.
-   **Company Management:** Register, list, and delete companies.
-   **Bank Accounts:** Manage multiple bank accounts per company.
-   **Financial Transactions:** Create, edit, and delete income and expense transactions.
-   **Categories:** Create custom, user-specific categories to classify entries.
-   **Reactive and Responsive UI:** Modern, mobile-friendly interface with visual feedback via toasts.
-   **Protected Routes:** Use of Auth Guards on the frontend to ensure secure navigation.

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Backend** | Java 21, Spring Boot, Spring Security (JWT), Spring Data JPA/Hibernate, Maven, Lombok, Testcontainers, JUnit |
| **Frontend** | Angular 19, TypeScript, RxJS, HTML5, CSS3, Standalone Components, ngx-toastr, @ng-icons |
| **Database** | MySQL (Production) & H2 (Tests) |
| **Infrastructure & DevOps** | Docker, Docker Compose, Azure (ACR, App Service, Database for MySQL), Git |

## 🚀 Running the Project Locally

With Docker, the complete development environment (Backend, Frontend, and Database) can be started with a single command.

### Prerequisites

-   [Git](https://git-scm.com/)
-   [JDK 21](https://sdkman.io/sdks/java/21.0.4-temurin) (Recommended via SDKMAN!)
-   [Maven](https://sdkman.io/sdks/maven/current) (Recommended via SDKMAN!)
-   [Node.js LTS (v22+)](https://github.com/nvm-sh/nvm) (Recommended via NVM)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Configuration Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/finance-system-monorepo.git](https://github.com/your-username/finance-system-monorepo.git)
    cd finance-system-monorepo
    ```

2.  **Create the environment variables file:**
    In the project root, create a file named `.env` and copy the contents from `.env.example` (if it exists) or use the template below. It contains the passwords for the local database.
    ```env
    # File: .env
    DB_ROOT_PASSWORD=root
    DB_USER=user
    DB_PASSWORD=password
    JWT_SECRET=a-secret-key-for-local-development
    ```

3.  **Build the backend project:**
    Docker needs the `.jar` file to build the image. Generate it for the first time with Maven.
    ```bash
    cd back-end
    mvn clean package
    cd ..
    ```

4.  **Start the application with Docker Compose:**
    This command will build the images and start the three containers.
    ```bash
    docker compose up --build
    ```

5.  **Access the application:**
    * **Frontend:** [http://localhost:4200](http://localhost:4200)
    * **Backend (API):** [http://localhost:8080](http://localhost:8080)

## 📁 Project Structure

```
.
├── back-end/               # Java/Spring Boot Project
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── front-end/              # Angular Project
│   ├── src/
│   ├── angular.json
│   └── Dockerfile
├── .env                    # Local environment variables (not versioned)
├── .gitignore
└── docker-compose.yml      # Container orchestrator
```

## 🗺️ Roadmap and Next Steps

-   [ ] Implement a dashboard with charts and reports.
-   [ ] Create a CI/CD pipeline with GitHub Actions to automate deployments to Azure.
-   [ ] Add end-to-end (E2E) tests with Cypress.
-   [ ] Implement a multi-tenancy system for the SaaS.

## 👨‍💻 My Contributions

This project was developed end-to-end by me, covering everything from architectural design, backend and frontend development, to containerization and cloud deployment.

<details>
<summary><strong>Click to see details of my technical responsibilities</strong></summary>

### Back-end (Java & Spring Boot):
- Developed a complete RESTful API in Java 21 with Spring Boot to centralize and automate the management of critical business data, applying a layered architecture (Controller, Service, Repository) to ensure the solution's maintainability and scalability.
- Implemented an end-to-end security system with Spring Security and JWT tokens, creating a stateless authentication flow where every request to protected routes requires token validation to ensure only authenticated users can access resources.
- Utilized Spring Data JPA and Hibernate for the persistence layer, mapping entities and abstracting communication with the MySQL database, with H2 support for an isolated test environment.
- Structured automated tests with JUnit and Testcontainers, guaranteeing the reliability of business rules and the continuous integration of features.
- Adopted software engineering best practices, such as SOLID principles and Clean Code, and used tools like Lombok and Spring DevTools to maximize development productivity.

### Frontend (Angular & TypeScript):
- Built a modern and reactive user interface with Angular, applying design patterns like Dependency Injection, Observer, and Repository to create decoupled, reusable, and easily maintainable code.
- Extensively used RxJS for reactive programming, managing asynchronous data streams, application state, and communication between components efficiently with Observables, Subjects, and operators.
- Implemented a robust integration with the RESTful API via HttpClient, including centralized error handling and the use of Interceptors for handling authentication tokens and headers.
- Structured the project with a focus on scalability, using Standalone Components, protected routes (Auth Guards), internationalization (i18n), and build quality control with budgets.

### Infrastructure & DevOps:
- Containerized the application with Docker, creating standardized environments for development and production.
- Deployed the backend, frontend, and MySQL database to the Azure cloud, completing the application's lifecycle and applying cloud infrastructure management practices.

</details>
