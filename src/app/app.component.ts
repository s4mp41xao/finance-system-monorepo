import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  mynaDollarCircle,
  mynaHome,
  mynaChevronRight,
  mynaChevronLeft,
  mynaBuildingOne,
} from '@ng-icons/mynaui/outline';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  viewProviders: [
    provideIcons({
      mynaHome,
      mynaDollarCircle,
      mynaChevronRight,
      mynaChevronLeft,
      mynaBuildingOne,
    }),
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-finance-crud';
}
