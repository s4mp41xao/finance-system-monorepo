import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data, RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  isExpanded = true; // começa aberto

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }
}
