import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { OrdersListComponent } from './orders-list.component';
import { OrdersListRoutingModule } from './orders-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrdersListComponent,],
  imports: [
    CommonModule,
    FormsModule,
    OrdersListRoutingModule,
    SharedModule,
    ZXingScannerModule
  ]
})
export class OrdersListModule { }
