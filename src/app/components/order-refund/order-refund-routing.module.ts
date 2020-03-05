import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { OrderRefundComponent } from './order-refund.component';

const routes: Routes = [
  {
    path: '',
    component: OrderRefundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRefundRoutingModule { }
