import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { OrderRefundComponent } from './order-refund.component';
import { OrderRefundRoutingModule } from './order-refund-routing.module';

@NgModule({
  declarations: [OrderRefundComponent],
  imports: [
    CommonModule,
    OrderRefundRoutingModule,
    SharedModule
  ]
})
export class OrderRefundModule { }
