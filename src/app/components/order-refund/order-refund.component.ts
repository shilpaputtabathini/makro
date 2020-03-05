import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IAppState } from './../../app.reducer';
import { EOrderRefundActions, CancelOrderStart } from './../order-refund/order-refund.actions';
import { GetOrderDetailsStart, EOrderDetailsActions } from '../order-details/order-details.actions';
import { DomService } from 'src/app/core/services/dom.service';
import { OrderService } from 'src/app/core/services/order.service';
declare var $: any;

@Component({
  selector: 'app-order-refund',
  templateUrl: './order-refund.component.html',
  styleUrls: ['./order-refund.component.scss', './../order-payment/order-payment.component.scss', './../order-details/order-details.component.scss']
})
export class OrderRefundComponent implements OnInit, AfterViewInit, OnDestroy {
  reasonDescription: string;
  orderId: number;
  orderDetails: any;
  actionsSubjectSubscription: Subscription;
  cancelOrderFailure: any;
  orderType: any;

  @ViewChild('wrapperRef', { static: false }) wrapperRef: ElementRef;
  @ViewChild('navigationBarContainerRef', { static: false }) navigationBarContainerRef: ElementRef;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _store: Store<IAppState>,
    private _actionsSubject: ActionsSubject,
    private _domService: DomService,
    private _orderService: OrderService,
    private _router: Router
  ) {
    this._activatedRoute.params.subscribe(params => {
      this.orderId = +params['id'] || null;
      if (this.orderId) {
        this.getOrderDetails(this.orderId);
      }
    });

    this._activatedRoute.queryParams.subscribe(params => {
      this.reasonDescription = params['reasonDescription'] || null;
      this.orderType = params['orderType'] || null;
    });

    this.actionsSubjectSubscription = this._actionsSubject.subscribe((action: any) => {
      switch (action.type) {
        case EOrderDetailsActions.GetOrderDetailsSuccess:
          this.orderDetails = action.payload.data.data.order || null;
          break;
        case EOrderDetailsActions.GetOrderDetailsFailure:
          break;
        case EOrderRefundActions.CancelOrderSuccess:
          this._router.navigate(['/order-history']);
          this._orderService.returnOrderSuccess.next(
            {
              flag: true,
              orderDetails: this.orderDetails,
              orderType: this.orderType
            }
          );
          break;
        case EOrderRefundActions.CancelOrderFailure:
          this.cancelOrderFailure = action.payload.error;
          this._orderService.returnOrderFailure.next(
            {
              flag: false,
              orderDetails: this.orderDetails,
              orderType: this.orderType,
              cancelOrderFailure: this.cancelOrderFailure
            }
          );
          break;
      }
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this._domService.adjustLayout(null, this.wrapperRef, this.navigationBarContainerRef);
  }

  getOrderDetails(orderId) {
    this._store.dispatch(new GetOrderDetailsStart({ data: { orderId } }));
  }

  onConfirmCancel() {
    this._store.dispatch(new CancelOrderStart({ data: { orderId: this.orderId, reason: this.reasonDescription } }));
  }

  ngOnDestroy() {
    this.actionsSubjectSubscription.unsubscribe();
  }
}
