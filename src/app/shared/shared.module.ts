import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';
import { GenericFilterPipe } from './pipes/generic-filter.pipe';
import { ReturnOrderSuccessModalComponent } from './components/return-order-success-modal/return-order-success-modal.component';
import { ReturnOrderFailureModalComponent } from './components/return-order-failure-modal/return-order-failure-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavigationBarComponent,
    LogoutComponent,
    GenericFilterPipe,
    ReturnOrderSuccessModalComponent,
    ReturnOrderFailureModalComponent
  ],
  exports: [
    NavigationBarComponent,
    LogoutComponent,
    ReturnOrderSuccessModalComponent,
    ReturnOrderFailureModalComponent,
    GenericFilterPipe
  ],
  providers: [
    GenericFilterPipe
  ]
})
export class SharedModule { }
