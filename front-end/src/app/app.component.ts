import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaCircleSolid } from '@ng-icons/mynaui/solid';
import {
  mynaDollarCircle,
  mynaHome,
  mynaChevronRight,
  mynaChevronLeft,
  mynaBuildingOne,
  mynaX,
  mynaBuilding,
  mynaListNumber,
  mynaTrashOne,
  mynaTrash,
  mynaBank,
  mynaTag,
} from '@ng-icons/mynaui/outline';

import {
  tdesignMoneyFilled,
  tdesignFactCheck,
  tdesignAdd,
  tdesignAddCircle,
  tdesignAddCircleFilled,
  tdesignDam,
  tdesignForm,
  tdesignInstitutionChecked,
  tdesignRootList,
  tdesignSystemLog,
  tdesignMoney,
  tdesignSwap,
  tdesignFile1,
  tdesignCalendar1,
  tdesignCheck,
  tdesignUser,
  tdesignLockOn,
  tdesignMail,
} from '@ng-icons/tdesign-icons';

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
      mynaX,
      mynaBuilding,
      mynaListNumber,
      tdesignMoneyFilled,
      tdesignFactCheck,
      tdesignAdd,
      tdesignAddCircle,
      tdesignAddCircleFilled,
      mynaTrashOne,
      mynaTrash,
      mynaCircleSolid,
      mynaBank,
      tdesignDam,
      tdesignForm,
      tdesignInstitutionChecked,
      tdesignRootList,
      tdesignSystemLog,
      tdesignMoney,
      tdesignSwap,
      mynaTag,
      tdesignFile1,
      tdesignCalendar1,
      tdesignCheck,
      tdesignUser,
      tdesignLockOn,
      tdesignMail,
    }),
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-finance-crud';
}
