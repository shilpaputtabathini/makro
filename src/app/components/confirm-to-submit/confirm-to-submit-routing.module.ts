import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ConfirmToSubmitComponent } from './confirm-to-submit.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmToSubmitComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmToSubmitRoutingModule { }
