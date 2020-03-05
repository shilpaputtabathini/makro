import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { DrawSignatureComponent } from './draw-signature.component';

const routes: Routes = [
  {
    path: '',
    component: DrawSignatureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrawSignatureRoutingModule { }
