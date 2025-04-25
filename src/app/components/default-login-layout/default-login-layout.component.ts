import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-login-layout',
  imports: [],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.css',
})
export class DefaultLoginLayoutComponent {
  @Input() title: string = '';
  @Input() loginButtonText: string = '';
  @Input() registerButtonText: string = '';
}
