import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { OrderService } from 'src/app/core/services/order.service';
import { ORDER_TYPES } from 'src/app/core/constants/order-types.constant';
import { REATTEMPT_ORDER_STATUSES } from 'src/app/core/constants/reattempt-order-statuses.constant';

declare var $: any;

@Component({
  selector: 'app-return-order-success-modal',
  templateUrl: './return-order-success-modal.component.html',
  styleUrls: ['./return-order-success-modal.component.scss']
})
export class ReturnOrderSuccessModalComponent implements OnInit, OnDestroy {
  orderDetails: any;
  orderType: any;
  orderTypes = ORDER_TYPES;
  reattemptOrderStatuses = REATTEMPT_ORDER_STATUSES;
  returnOrderSubscription: Subscription;
  reattemptOrderStatus: any;

  constructor(
    private _orderService: OrderService
  ) {
    this.returnOrderSubscription = this._orderService.returnOrderSuccessChange$.subscribe((data: any) => {
      if (data) {
        this.orderDetails = data.orderDetails || null;
        this.orderType = data.orderType || null;
        this.reattemptOrderStatus = data.reattemptOrderStatus || null;
        $('#return-order-success-modal').modal('show');
      }
    });
  }

  ngOnInit() {
  }

  closeModal() {
    $('#return-order-success-modal').modal('hide');
  }

  ngOnDestroy() {
    this.returnOrderSubscription.unsubscribe();
  }
}
