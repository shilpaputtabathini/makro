import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducer } from './app.reducer';
import { LoginEffects } from './components/login/login.effects';
import { OrdersListEffects } from './components/orders-list/orders-list.effects';
import { OrderDetailsEffects } from './components/order-details/order-details.effects';
import { OrderRefundEffects } from './components/order-refund/order-refund.effects';
import { SharedModule } from './shared/shared.module';
import { OrderPaymentEffects } from './components/order-payment/order-payment.effects';

//pipe


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([LoginEffects, OrdersListEffects, OrderDetailsEffects, OrderRefundEffects,OrderPaymentEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
