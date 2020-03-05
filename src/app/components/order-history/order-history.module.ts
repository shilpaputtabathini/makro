import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { OrderHistoryComponent } from './order-history.component';
import { OrderHistoryRoutingModule } from './order-history-routing.module';


@NgModule({
  declarations: [OrderHistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrderHistoryRoutingModule,
  ]
})
export class OrderHistoryModule { }
