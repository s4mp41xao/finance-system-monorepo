# Finance System Control 📊
A modern, responsive finance management web application built with Angular 17+.
Features user authentication (JWT), company and bank account management, transaction tracking, and category management—all with a clean UI and modular code structure.

## Features
- Authentication: JWT-based login and registration
- Company Management: Register, list, and delete companies
- Bank Accounts: Manage multiple bank accounts per company
- Transactions: Create, edit, and delete financial transactions
- Categories: Custom categories per user, with duplicate prevention
- Responsive UI: Modern design with icon support and mobile-friendly layouts
-Toasts & Feedback: User feedback with ngx-toastr
- Protected Routes: Auth guards for secure navigation

## Technologies
- Angular 19
- @ng-icons (icon system)
- ngx-toastr (notifications)
- RxJS

## Getting Started
Prerequisites
- Node.js (v18+ recommended)
- Angular CLI (npm install -g @angular/cli)

````bash
git clone https://github.com/your-username/angular-finance-crud.git
cd angular-finance-crud/angular-login-and-register-with-jwt
npm install
````

## Customization
- Icons: Easily swap or add icons via @ng-icons and provideIcons in `app.component.ts.`
- Theme: Change color palette in CSS files under styles and component folders.
- Backend: Update API endpoints in the services as needed for your backend.

### License
MIT
