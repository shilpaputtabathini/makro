import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { OrderPaymentComponent } from './order-payment.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPaymentComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPaymentRoutingModule { }
