import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPaymentComponent } from './order-payment.component';
import { OrderPaymentRoutingModule } from './order-payment-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OrderPaymentComponent],
  imports: [
    CommonModule,
    OrderPaymentRoutingModule,
    SharedModule
  ]
})
export class OrderPaymentModule { }
