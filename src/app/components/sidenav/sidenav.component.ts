import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  isExpanded = true; // começa aberto

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  menuItems = [
    { label: 'Dashboard', icon: '🏠', route: '/dashboard' },
    { label: 'Expenses', icon: '⚙', route: '/expenses' },
    // { label: 'Profile', icon: '👤', route: '/profile' },
  ];
}
