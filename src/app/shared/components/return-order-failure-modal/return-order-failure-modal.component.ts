import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { OrderService } from 'src/app/core/services/order.service';
import { ORDER_TYPES } from 'src/app/core/constants/order-types.constant';
import { REATTEMPT_ORDER_STATUSES } from 'src/app/core/constants/reattempt-order-statuses.constant';

declare var $: any;

@Component({
  selector: 'app-return-order-failure-modal',
  templateUrl: './return-order-failure-modal.component.html',
  styleUrls: ['./return-order-failure-modal.component.scss', './../return-order-success-modal/return-order-success-modal.component.scss']
})
export class ReturnOrderFailureModalComponent implements OnInit, OnDestroy {
  orderDetails: any;
  cancelOrderFailure: any;
  orderType: any;
  orderTypes = ORDER_TYPES;
  reattemptOrderStatus: any;
  reattemptOrderStatuses = REATTEMPT_ORDER_STATUSES;
  returnOrderSubscription: Subscription;

  constructor(
    private _orderService: OrderService
  ) {
    this.returnOrderSubscription = this._orderService.returnOrderFailureChange$.subscribe((data: any) => {
      if (data) {
        this.orderDetails = data.orderDetails;
        this.cancelOrderFailure = data.cancelOrderFailure;
        this.orderType = data.orderType || null;
        this.reattemptOrderStatus = data.reattemptOrderStatus || null;
        $('#return-order-failure-modal').modal('show');
      }
    });
  }

  ngOnInit() {
  }

  closeModal() {
    $('#return-order-failure-modal').modal('hide');
  }

  ngOnDestroy() {
    this.returnOrderSubscription.unsubscribe();
  }
}
