import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { DefaultInputButtonComponent } from '../../components/default-input-button/default-input-button.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgIcon } from '@ng-icons/core';

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    DefaultInputButtonComponent,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  // send data to DB
  submit() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => {
          this.toastService.success('Usúario logado com sucesso!');
          this.router.navigate(['/dashboard']);
        },
        error: () => this.toastService.error('Erro ao logar'),
      });
    // console.log(this.loginForm.value.email);
  }

  // create route to signup
  navigate() {
    this.router.navigate(['/signup']);
  }

  ngOnInit() {
    const authToken = sessionStorage.getItem('auth-token');
    if (authToken) {
      this.router.navigate(['/dashboard']);
    }
  }
}
