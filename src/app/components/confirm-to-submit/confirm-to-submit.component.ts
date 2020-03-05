import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { DomService } from 'src/app/core/services/dom.service';
import { GetOrderDetailsStart, EOrderDetailsActions } from '../order-details/order-details.actions';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-confirm-to-submit',
  templateUrl: './confirm-to-submit.component.html',
  styleUrls: ['./confirm-to-submit.component.scss', './../order-payment/order-payment.component.scss']
})
export class ConfirmToSubmitComponent implements OnInit, AfterViewInit, OnDestroy {
  orderId: number;
  authToken: string;
  orderNumber: string;
  actionsSubjectSubscription: Subscription;
  orderDetails: any;
  orderType: string;
  isReturnOrder = false;

  @ViewChild('headerRef', { static: false }) headerRef: ElementRef;
  @ViewChild('wrapperRef', { static: false }) wrapperRef: ElementRef;
  @ViewChild('navigationBarContainerRef', { static: false }) navigationBarContainerRef: ElementRef;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _actionsSubject: ActionsSubject,
    private _store: Store<IAppState>,
    private _domService: DomService,
    private _router: Router,
    private _orderService: OrderService
  ) {
    this._activatedRoute.params.subscribe(params => {
      this.orderId = +params['id'] || null;
    });

    this._activatedRoute.queryParams.subscribe(params => {
      this.orderType = params['orderType'] || null;
    });

    this.actionsSubjectSubscription = this._actionsSubject.subscribe((action: any) => {
      switch (action.type) {
        case EOrderDetailsActions.GetOrderDetailsSuccess:
          this.orderDetails = action.payload.data.data.order || null;
          this.authToken = this.orderDetails.auth_token;
          this.orderNumber = this.orderDetails.order_number;
          this.isReturnOrder = this._orderService.checkIfReturnOrder(this.orderDetails);
          break;
      }
    });
  }

  ngOnInit() {
    let orderId = this.orderId;
    this._store.dispatch(new GetOrderDetailsStart({ data: { orderId } }));
  }

  getOrderPayment(orderId) {
    this._router.navigate(['/order-payment', orderId],
      {
        queryParams: {
          authToken: this.authToken,
          orderNumber: this.orderNumber
        }
      }
    );
  }

  ngAfterViewInit() {
    this._domService.adjustLayout(this.headerRef, this.wrapperRef, this.navigationBarContainerRef);
  }

  goBack() {
    this._router.navigate(['/orders-list', this.orderId], {
      queryParams: {
        orderType: this.orderType
      }
    });
  }

  ngOnDestroy() {
    this.actionsSubjectSubscription.unsubscribe();
  }
}
