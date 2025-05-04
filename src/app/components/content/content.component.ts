import { Component } from '@angular/core';
import { DashboardComponent } from '../../pages/home/dashboard/dashboard.component';
import { ExpensesComponent } from '../../pages/home/expenses/expenses.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  imports: [CommonModule, DashboardComponent, ExpensesComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {}
