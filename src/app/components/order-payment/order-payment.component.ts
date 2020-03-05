import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription, interval } from 'rxjs';

import { IAppState } from 'src/app/app.reducer';
import { DomService } from 'src/app/core/services/dom.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { GetOrderDetailsStart, EOrderDetailsActions } from '../order-details/order-details.actions';
import { PaymentUpdateOrderStart, EOrderPaymentActions } from './order-payment.actions';
import { environment } from 'src/environments/environment';


declare var $: any;

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit, OnDestroy {
  orderId: number;
  authToken: string;
  orderNumber: string;
  isOrderConfirmed = false;
  isOrderWaiting = false;
  actionsSubjectSubscription: Subscription;
  orderDetails: any;
  paymentUrl: any;
  payment_status: string;
  sub: Subscription;
  isReturnOrder = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _actionsSubject: ActionsSubject,
    private _store: Store<IAppState>,
    private _authService: AuthService,
    private _domService: DomService,
    private orderService: OrderService,
    private hostElement: ElementRef,
    private _route: Router,
    private _orderService: OrderService
  ) {
    this._activatedRoute.params.subscribe(params => {
      this.orderId = +params['id'] || null;
    });

    this.actionsSubjectSubscription = this._actionsSubject.subscribe((action: any) => {
      switch (action.type) {
        case EOrderDetailsActions.GetOrderDetailsStart:
          break;
        case EOrderDetailsActions.GetOrderDetailsSuccess:
          this.orderDetails = action.payload.data.data.order || null;
          this.orderNumber = this.orderDetails.order_number;
          this.authToken = this.orderDetails.auth_token;
          this.payment_status = action.payload.data.data.order.payment_status;
          this.isReturnOrder = this._orderService.checkIfReturnOrder(this.orderDetails);
          if (this.payment_status == 'paid') {
            let orderId = this.orderId;
            this._route.navigate(['/draw-signature', orderId]);
          }
          break;
        case EOrderDetailsActions.GetOrderDetailsFailure:
          break;
        case EOrderPaymentActions.PaymentUpdateOrderStart:
          break;
        case EOrderPaymentActions.PaymentUpdateOrderSuccess:
          this.paymentUrl = action.payload.data.payment_url;
          this.isOrderWaiting = true;
          $('#payment-modal').modal('show');
          const iframe = this.hostElement.nativeElement.querySelector('iframe');
          iframe.src = environment.paymentUrl + this.paymentUrl;
          this.startPolling();
          break;
        case EOrderPaymentActions.PaymentUpdateOrderFailure:
          break;
      }
    })
  }

  ngOnInit() {
    let orderId = this.orderId;
    this._store.dispatch(new GetOrderDetailsStart({ data: { orderId } }));
  }

  confirm() {
    let orderId = this.orderId;
    this._store.dispatch(new PaymentUpdateOrderStart({ data: { orderId } }))
  }

  startPolling() {
    interval(10000).subscribe(x => {
      if (this.payment_status == 'not_paid' || this.payment_status == 'waiting_for_payment' ) {
        this.sub = this.orderService.getCurrentPaymentStatus(this.orderId).subscribe((data: any) => {
          this.payment_status = data.data.order.payment_status;
        });
      } else {
        $('#payment-modal').modal('hide');
        this.sub.unsubscribe();
        this.isOrderWaiting = false;
        let orderId = this.orderId;
        this._route.navigate(['/draw-signature', orderId]);
      }
    });
  }

  ngOnDestroy() {
    this.actionsSubjectSubscription.unsubscribe();
    if (this.isOrderWaiting == true && this.sub) {
      this.sub.unsubscribe();
    }
  }
}
