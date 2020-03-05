import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreLoginGuard } from './core/guards/pre-login-guard.service';
import { PostLoginGuard } from './core/guards/post-login-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
    canActivate: [PreLoginGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [PostLoginGuard]
  },
  {
    path: 'orders-list',
    loadChildren: () => import('./components/orders-list/orders-list.module').then(m => m.OrdersListModule),
    canActivate: [PostLoginGuard]
  },
  {
    path: 'cancel-orders',
    loadChildren: () => import('./components/orders-list/orders-list.module').then(m => m.OrdersListModule),
    canActivate: [PostLoginGuard]
  },
  {
    path: 'orders-list/:id',
    loadChildren: () => import('./components/order-details/order-details.module').then(m => m.OrderDetailsModule),
    canActivate: [PostLoginGuard]
  },
  {
    path: 'order-history',
    loadChildren: () => import('./components/order-history/order-history.module').then(m => m.OrderHistoryModule),
    canActivate: [PostLoginGuard]
  },
  {
    path: 'confirm-to-submit/:id',
    loadChildren: () => import('./components/confirm-to-submit/confirm-to-submit.module').then(m => m.ConfirmToSubmitModule),
    canActivate: [PostLoginGuard]
  },
  {
    path: 'order-payment/:id',
    loadChildren: () => import('./components/order-payment/order-payment.module').then(m => m.OrderPaymentModule),
    canActivate: [PostLoginGuard]
  },
  {
    path: 'draw-signature/:id',
    loadChildren: () => import('./components/draw-signature/draw-signature.module').then(m => m.DrawSignatureModule),
    canActivate: [PostLoginGuard]
  },
  {
    path: 'cancel-orders/:id',
    loadChildren: () => import('./components/order-details/order-details.module').then(m => m.OrderDetailsModule),
    canActivate: [PostLoginGuard]
  },
  {
    path: 'order-refund/:id',
    loadChildren: () => import('./components/order-refund/order-refund.module').then(m => m.OrderRefundModule),
    canActivate: [PostLoginGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
