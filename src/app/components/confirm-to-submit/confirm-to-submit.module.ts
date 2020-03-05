import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmToSubmitComponent } from './confirm-to-submit.component';
import { ConfirmToSubmitRoutingModule } from './confirm-to-submit-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ConfirmToSubmitComponent],
  imports: [
    CommonModule,
    ConfirmToSubmitRoutingModule,
    SharedModule
  ]
})
export class ConfirmToSubmitModule { }
