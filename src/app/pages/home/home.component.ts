import { Component } from '@angular/core';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [SidenavComponent, RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isSidenavExpanded = false;

  // Receba esse evento de app-sidenav quando o usuário expandir/recolher
  onSidenavToggle(expanded: boolean) {
    this.isSidenavExpanded = expanded;
  }
}
