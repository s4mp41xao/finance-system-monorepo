import { Component } from '@angular/core';
import { DashboardComponent } from '../../pages/home/dashboard/dashboard.component';
import { ExpensesComponent } from '../../pages/home/expenses/expenses.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  imports: [RouterOutlet],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {}
