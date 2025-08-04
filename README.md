# Sistema de Gestão Financeira - Contaki 📊

![Java](https://img.shields.io/badge/Java-21-blue?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-brightgreen?logo=spring)
![Angular](https://img.shields.io/badge/Angular-19-red?logo=angular)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker)
![Azure](https://img.shields.io/badge/Azure-blue?logo=microsoftazure)

Este repositório contém o código-fonte de uma aplicação web completa, projetada para operar como um serviço (SaaS) e resolver o desafio de controle financeiro para pequenas empresas. A plataforma centraliza o gerenciamento de contas, lançamentos de receitas e despesas, e oferece uma visão clara da saúde financeira do negócio.

## 🏛️ Visão Geral da Arquitetura

O projeto foi estruturado em um **monorepo** para facilitar o desenvolvimento integrado e a manutenção de um backend robusto em **Java/Spring Boot** e um frontend reativo em **Angular/TypeScript**. A solução completa foi conteinerizada com **Docker** para garantir ambientes consistentes e o deploy foi realizado na nuvem da **Azure**, utilizando serviços como ACR, Azure Database for MySQL e App Services.

## ✨ Features Principais

-   **Autenticação Segura:** Sistema de login e registro baseado em tokens JWT.
-   **Gestão de Empresas:** Cadastro, listagem e exclusão de empresas.
-   **Contas Bancárias:** Gerenciamento de múltiplas contas bancárias por empresa.
-   **Lançamentos Financeiros:** Criação, edição e exclusão de transações de receita e despesa.
-   **Categorias:** Criação de categorias personalizadas por usuário para classificar os lançamentos.
-   **UI Reativa e Responsiva:** Interface moderna e amigável para dispositivos móveis, com feedback visual através de toasts.
-   **Rotas Protegidas:** Uso de Auth Guards no frontend para garantir a segurança da navegação.

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologias |
| :--- | :--- |
| **Backend** | Java 21, Spring Boot, Spring Security (JWT), Spring Data JPA/Hibernate, Maven, Lombok, Testcontainers, JUnit |
| **Frontend** | Angular 19, TypeScript, RxJS, HTML5, CSS3, Standalone Components, ngx-toastr, @ng-icons |
| **Banco de Dados** | MySQL (Produção) & H2 (Testes) |
| **Infraestrutura & DevOps** | Docker, Docker Compose, Azure (ACR, App Service, Database for MySQL), Git |

## 🚀 Rodando o Projeto Localmente

Com o Docker, o ambiente de desenvolvimento completo (Backend, Frontend e Banco de Dados) pode ser iniciado com um único comando.

### Pré-requisitos

-   [Git](https://git-scm.com/)
-   [JDK 21](https://sdkman.io/sdks/java/21.0.4-temurin) (Recomendado via SDKMAN!)
-   [Maven](https://sdkman.io/sdks/maven/current) (Recomendado via SDKMAN!)
-   [Node.js LTS (v22+)](https://github.com/nvm-sh/nvm) (Recomendado via NVM)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Passos para Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/finance-system-monorepo.git](https://github.com/seu-usuario/finance-system-monorepo.git)
    cd finance-system-monorepo
    ```

2.  **Crie o arquivo de variáveis de ambiente:**
    Na raiz do projeto, crie um arquivo chamado `.env` e copie o conteúdo do arquivo `.env.example` (se existir) ou use o modelo abaixo. Ele contém as senhas para o banco de dados local.
    ```env
    # Arquivo: .env
    DB_ROOT_PASSWORD=root
    DB_USER=user
    DB_PASSWORD=password
    JWT_SECRET=chave-secreta-para-ambiente-de-desenvolvimento
    ```

3.  **Construa o projeto backend:**
    O Docker precisa do arquivo `.jar` para construir a imagem. Gere-o pela primeira vez com o Maven.
    ```bash
    cd back-end
    mvn clean package
    cd ..
    ```

4.  **Inicie a aplicação com Docker Compose:**
    Este comando irá construir as imagens e iniciar os três containers.
    ```bash
    docker compose up --build
    ```

5.  **Acesse a aplicação:**
    * **Frontend:** [http://localhost:4200](http://localhost:4200)
    * **Backend (API):** [http://localhost:8080](http://localhost:8080)

## 📁 Estrutura do Projeto

```
.
├── back-end/               # Projeto Java/Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── front-end/              # Projeto Angular
│   ├── src/
│   ├── angular.json
│   └── Dockerfile
├── .env                    # Variáveis de ambiente locais (não versionado)
├── .gitignore
└── docker-compose.yml      # Orquestrador dos containers
```

## 🗺️ Roadmap e Próximos Passos

-   [ ] Implementar dashboard com gráficos e relatórios.
-   [ ] Criar pipeline de CI/CD com GitHub Actions para automatizar o deploy na Azure.
-   [ ] Adicionar testes de ponta a ponta (E2E) com Cypress.
-   [ ] Implementar sistema de multi-tenancy para o SaaS.

## 👨‍💻 Minhas Contribuições

Este projeto foi desenvolvido de ponta a ponta por mim, cobrindo desde a concepção da arquitetura, desenvolvimento do backend e frontend, até a conteinerização e o deploy na nuvem.

<details>
<summary><strong>Clique para ver detalhes das minhas responsabilidades técnicas</strong></summary>

### Back-end (Java & Spring Boot):
- Desenvolvi uma API RESTful completa em Java 21 com Spring Boot para centralizar e automatizar o gerenciamento de dados críticos do negócio, aplicando uma arquitetura em camadas (Controller, Service, Repository) para garantir a manutenibilidade e escalabilidade da solução.
- Implementei um sistema de segurança ponta a ponta com Spring Security e tokens JWT, criando um fluxo de autenticação stateless onde cada requisição a rotas protegidas exige a validação do token para garantir que somente usuários autenticados acessem os recursos.
- Utilizei Spring Data JPA e Hibernate para a camada de persistência, mapeando entidades e abstraindo a comunicação com o banco de dados MySQL, com suporte a H2 para um ambiente de testes isolado.
- Estruturei testes automatizados com JUnit e Testcontainers, garantindo a confiabilidade das regras de negócio e a integração contínua das funcionalidades.
- Adotei boas práticas de engenharia de software, como os princípios SOLID e Clean Code, e utilizei ferramentas como Lombok e Spring DevTools para maximizar a produtividade no desenvolvimento.

### Frontend (Angular & TypeScript):
- Construí uma interface de usuário reativa e moderna com Angular, aplicando padrões de design como Injeção de Dependência, Observer e Repository para criar um código desacoplado, reutilizável e de fácil manutenção.
- Utilizei extensivamente RxJS para programação reativa, gerenciando fluxos de dados assíncronos, estados da aplicação e comunicação entre componentes de forma eficiente com Observables, Subjects e operadores.
- Implementei uma integração robusta com a API RESTful via HttpClient, incluindo tratamento centralizado de erros e o uso de interceptadores (Interceptors) para manipulação de tokens de autenticação e headers.
- Estruturei o projeto com foco em escalabilidade, utilizando Standalone Components, rotas protegidas (Auth Guards), internacionalização (i18n) e controle de qualidade de build com budgets.

### Infraestrutura & DevOps:
- Containerizei a aplicação com Docker, criando ambientes padronizados para desenvolvimento e produção.
- Realizei o deploy do backend, frontend e do banco de dados MySQL na nuvem da Azure, completando o ciclo de vida da aplicação e aplicando na prática o gerenciamento de infraestrutura em nuvem.

</details>

---
