import { Component } from '@angular/core';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-sidenav',
  imports: [ContentComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {}
