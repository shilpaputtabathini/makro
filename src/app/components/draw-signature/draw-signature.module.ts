import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SignaturePadModule } from '@ng-plus/signature-pad';

import { DrawSignatureComponent } from './draw-signature.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DrawSignatureRoutingModule } from './draw-signature-routing.module';

@NgModule({
  declarations: [DrawSignatureComponent],
  imports: [
    CommonModule,
    DrawSignatureRoutingModule,
    SharedModule,
    NgbDatepickerModule,
    FormsModule,
    SignaturePadModule
  ]
})
export class DrawSignatureModule { }
