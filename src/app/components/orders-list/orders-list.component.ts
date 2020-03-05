import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

import { IAppState } from 'src/app/app.reducer';
import { EOrdersListActions, GetOrdersListStart, GetReasonCodeStart, SetOrderMarkAsReadyStart, SetOrderMarkAsReattemptStart } from './orders-list.actions';
import { ORDER_TYPES } from 'src/app/core/constants/order-types.constant';
import { REATTEMPT_ORDER_STATUSES } from 'src/app/core/constants/reattempt-order-statuses.constant';
import { DomService } from 'src/app/core/services/dom.service';
import { REASON_TYPES } from 'src/app/core/constants/reason-types.constant';
import { OrderService } from 'src/app/core/services/order.service';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  actionsSubjectSubscription: Subscription;
  ordersList: any = [];
  reasonCodeList: any = [];
  selectedOrder: any;
  orderTypes = ORDER_TYPES;
  selectedOrderType = this.orderTypes.DELIVERY_ORDERS;
  reattemptOrderStatuses = REATTEMPT_ORDER_STATUSES;
  selectedOrderReason = null;
  searchTerm = '';
  checked: boolean = false;
  selectedIndex: any;

  // barcode scanner
  showBarcodeScanner = false;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];
  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  noOrderFoundAfterScan = false;

  @ViewChild('wrapperRef', { static: false }) wrapperRef: ElementRef;
  @ViewChild('navigationBarContainerRef', { static: false }) navigationBarContainerRef: ElementRef;

  constructor(
    private _store: Store<IAppState>,
    private _actionsSubject: ActionsSubject,
    private _route: ActivatedRoute,
    private _router: Router,
    private _domService: DomService,
    private _orderService: OrderService
  ) {

    this._route.queryParams.subscribe(queryParams => {
      this.selectedOrderType = queryParams['orderType'] || this.orderTypes.DELIVERY_ORDERS;
    });

    this.actionsSubjectSubscription = this._actionsSubject.subscribe((action: any) => {
      switch (action.type) {
        case EOrdersListActions.GetOrdersListStart:
          break;
        case EOrdersListActions.GetOrdersListSuccess:
          this.ordersList = action.payload.data.data.orders || [];
          break;
        case EOrdersListActions.GetOrdersListFailure:
          alert(action.payload.error.error.error_description);
          break;
        case EOrdersListActions.GetReasonCodeSuccess:
          this.reasonCodeList = action.payload.data.data.reason_codes || [];
          this.selectedOrderReason = this.reasonCodeList[0];
          break;
        case EOrdersListActions.SetOrderMarkAsReadySuccess:
          this.getOrdersList();
          this._orderService.returnOrderSuccess.next(
            {
              flag: true,
              orderDetails: this.selectedOrder,
              orderType: this.selectedOrderType,
              reattemptOrderStatus: REATTEMPT_ORDER_STATUSES.MARK_AS_READY
            }
          );
          break;
        case EOrdersListActions.SetOrderMarkAsReadyFailure:
          this._orderService.returnOrderFailure.next(
            {
              flag: false,
              orderDetails: this.selectedOrder,
              orderType: this.selectedOrderType,
              reattemptOrderStatus: REATTEMPT_ORDER_STATUSES.MARK_AS_READY
            }
          );
          break;
        case EOrdersListActions.SetOrderMarkAsReattemptSuccess:
          this.getOrdersList();
          this._orderService.returnOrderSuccess.next(
            {
              flag: true,
              orderDetails: this.selectedOrder,
              orderType: this.selectedOrderType,
              reattemptOrderStatus: REATTEMPT_ORDER_STATUSES.MARK_AS_REATTEMPT
            }
          );
          break;
        case EOrdersListActions.SetOrderMarkAsReattemptFailure:
          this._orderService.returnOrderFailure.next(
            {
              flag: false,
              orderDetails: this.selectedOrder,
              orderType: this.selectedOrderType,
              reattemptOrderStatus: REATTEMPT_ORDER_STATUSES.MARK_AS_REATTEMPT
            }
          );
          break;
      }
    });
  }

  ngOnInit() {
    this.getOrdersList();
    this.getReasonCodes();
  }

  ngAfterViewInit() {
    this._domService.adjustLayout(null, this.wrapperRef, this.navigationBarContainerRef);
  }

  getOrdersList() {
    let payload = {
      status: null
    };
    if (this.selectedOrderType === ORDER_TYPES.PENDING_ORDERS || this.selectedOrderType === ORDER_TYPES.CANCEL_ORDERS) {
      payload.status = this.selectedOrderType;
    }
    this._store.dispatch(new GetOrdersListStart(payload));
    // if(this.orderDetails)
    // for()

  }

  onOrderSelect(selectedOrder) {
    if (selectedOrder && !selectedOrder.is_reattempt) {
      this._router.navigate(['/orders-list/', selectedOrder.id], { queryParams: { orderType: this.selectedOrderType } });
    }
  }

  onReattemptStatusSelection(event, order, selectedStatus, i) {
    this.selectedIndex = i;
    this.selectedOrder = order;
    event.preventDefault();
    event.stopPropagation();
    if (selectedStatus === this.reattemptOrderStatuses.MARK_AS_REATTEMPT) {
      $('#order-reason-modal').modal('show');
    } else {
      this._store.dispatch(new SetOrderMarkAsReadyStart({ data: { orderId: this.selectedOrder.id } }));
    }
  }

  onCancelOrder(event, order) {
    this.selectedOrder = order;
    event.preventDefault();
    event.stopPropagation();
    $('#cancel-order-modal').modal('show');
  }

  onReasonSave() {
    if (this.selectedOrderReason) {
      if (this.selectedOrderType === ORDER_TYPES.REATTEMPT_ORDERS) {
        this._store.dispatch(new SetOrderMarkAsReattemptStart({ data: { orderId: this.selectedOrder.id, reason: this.selectedOrderReason.description, returnOrderNumber: this.selectedOrder.order_number } }))
      } else if (this.selectedOrderType === ORDER_TYPES.CANCEL_ORDERS) {
        this._router.navigate(['/order-refund', this.selectedOrder.id],
          {
            queryParams: {
              reasonDescription: this.selectedOrderReason.description,
              orderType: this.selectedOrderType
            }
          });
      }
      this.closeModal();
    }

  }

  closeModal() {
    $('#order-reason-modal').modal('hide');
  }

  getReasonCodes() {
    this._store.dispatch(new GetReasonCodeStart({ status: REASON_TYPES.CANCEL_REASON }));
  }

  // #################################################### //
  //              BARCODE RELATED FUNCTIONS               //
  // #################################################### //

  toggleBarcodeScanner() {
    this.showBarcodeScanner = !this.showBarcodeScanner;
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.showBarcodeScanner = !this.showBarcodeScanner;
    if (this.qrResultString) {
      const orderNo = this.qrResultString.substr(3);
      this.searchTerm = orderNo;
    }
  }

  ngOnDestroy() {
    this.actionsSubjectSubscription.unsubscribe();
  }
}
