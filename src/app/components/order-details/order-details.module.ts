import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { OrderDetailsComponent } from './order-details.component';
import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderDetailsComponent],
  imports: [
    CommonModule,
    OrderDetailsRoutingModule,
    SharedModule,
    ZXingScannerModule,
    FormsModule,
  ]
})
export class OrderDetailsModule { }
