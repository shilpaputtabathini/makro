import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription, BehaviorSubject } from 'rxjs';
import { BarcodeFormat } from '@zxing/library';
declare var $: any;

import { EOrderDetailsActions, GetOrderDetailsStart, ConfirmOrderStart, ReturnOrderStart, ConfirmAllStart } from './order-details.actions';
import { IAppState } from 'src/app/app.reducer';
import { DomService } from 'src/app/core/services/dom.service';
import { GetReasonCodeStart, EOrdersListActions } from '../orders-list/orders-list.actions';
import { ORDER_TYPES } from 'src/app/core/constants/order-types.constant';
import { REASON_TYPES } from 'src/app/core/constants/reason-types.constant';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss', './../orders-list/orders-list.component.scss']
})
export class OrderDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  orderId: number;
  orderDetails: any;
  actionsSubjectSubscription: Subscription;
  selectedOrder: any;
  selectedItem: any;
  reasonCodeList: any = [];
  selectedOrderReason: any = '';
  returnedQuantity = 0;
  returnedQuantityCopy = 0;
  orderTypes = ORDER_TYPES;
  selectedOrderType = this.orderTypes.DELIVERY_ORDERS;
  itemNumIs: any;
  selectedIndex: any;

  @ViewChild('headerRef', { static: false }) headerRef: ElementRef;
  @ViewChild('wrapperRef', { static: false }) wrapperRef: ElementRef;
  @ViewChild('navigationBarContainerRef', { static: false }) navigationBarContainerRef: ElementRef;

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

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _actionsSubject: ActionsSubject,
    private _store: Store<IAppState>,
    private _domService: DomService,
    private _router: Router,
    private orderService: OrderService,
    private myElement: ElementRef
  ) {
    this._activatedRoute.queryParams.subscribe(queryParams => {
      this.selectedOrderType = queryParams['orderType'] || this.orderTypes.DELIVERY_ORDERS;
    });

    this._activatedRoute.params.subscribe(params => {
      this.orderId = +params['id'] || null;
      if (this.orderId) {
        this.getOrderDetails(this.orderId);
        this.getReasonCodes();
      }
    });

    this.actionsSubjectSubscription = this._actionsSubject.subscribe((action: any) => {
      switch (action.type) {
        case EOrderDetailsActions.GetOrderDetailsStart:
          break;
        case EOrderDetailsActions.GetOrderDetailsSuccess:
          this.orderDetails = action.payload.data.data.order || null;
          break;
        case EOrderDetailsActions.GetOrderDetailsFailure:
          break;
        case EOrderDetailsActions.ConfirmOrderSuccess:
          this.getOrderDetails(this.orderId);
          break;
        case EOrdersListActions.GetReasonCodeSuccess:
          this.reasonCodeList = action.payload.data.data.reason_codes || [];
          break;
        case EOrderDetailsActions.ReturnOrderSuccess:
          $('#return-product-modal').modal('hide');
          this.getOrderDetails(this.orderId);
          break;
        case EOrderDetailsActions.ConfirmAllSuccess:
          this._router.navigate(['/confirm-to-submit', this.orderId],
            {
              queryParams: {
                authToken: this.orderDetails.auth_token,
                orderType: this.selectedOrderType
              }
            }
          );
          break;
        case EOrderDetailsActions.ConfirmAllFailure:
          alert(action.payload.data.message);
          break;
        // this._router.navigate(['/orders-list']);
      }
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this._domService.adjustLayout(this.headerRef, this.wrapperRef, this.navigationBarContainerRef);
  }

  getOrderDetails(orderId) {
    this._store.dispatch(new GetOrderDetailsStart({ data: { orderId } }));
  }

  goBack() {
    this._router.navigate(['/orders-list'], { queryParams: { orderType: this.selectedOrderType } });
  }

  confirmAll() {
    this._store.dispatch(new ConfirmAllStart({ data: { orderId: this.orderId } }));
  }

  showModal(event) {
    event.preventDefault();
    event.stopPropagation();
    $('#cancel-order-modal').modal('show');
    this.selectedOrder = { ...this.orderDetails };
  }

  onConfirmOrderLine(orderId) {
    this._store.dispatch(new ConfirmOrderStart({ data: { orderId: this.orderId, order_line_id: orderId } }));
  }

  onReturn(item) {
    this.selectedItem = item;
    this.selectedOrderReason = '';
    const uomType = this.selectedItem.uom;
    this.returnedQuantity = parseFloat(this.selectedItem.returned_quantity);
    if (uomType === 'EACH') {
      this.returnedQuantity = parseInt(this.returnedQuantity.toString());
    }
    this.returnedQuantityCopy = this.returnedQuantity;
  }

  getReasonCodes() {
    if (this.selectedOrderType === ORDER_TYPES.CANCEL_ORDERS) {
      this._store.dispatch(new GetReasonCodeStart({ status: REASON_TYPES.CANCEL_REASON }));
    } else {
      this._store.dispatch(new GetReasonCodeStart({ status: REASON_TYPES.RETURN_REASON }));
    }
  }

  onQuantityChange() {
    const quantity = this.selectedItem.shipped_quantity;
    const uomType = this.selectedItem.uom;
    if (isNaN(this.returnedQuantity)) {
      this.returnedQuantity = this.returnedQuantityCopy;
      alert('You have entered invalid quantity');
    } else if (uomType === 'EACH' && this.returnedQuantity.toString().indexOf('.') > -1) {
      this.returnedQuantity = this.returnedQuantityCopy;
      alert('You can not add decimal quantity for item type EACH');
    } else if (uomType !== 'EACH'
      && this.returnedQuantity.toString().indexOf('.') > -1
      && this.returnedQuantity.toString().split('.')[1].length > 2) {
      this.returnedQuantity = this.returnedQuantityCopy;
      alert('You can not add decimal quantity with more than 2 decimal places');
    } else {
      if (this.returnedQuantity.toString().indexOf('.') > -1) {
        this.returnedQuantity = parseFloat(this.returnedQuantity.toString());
      } else {
        this.returnedQuantity = parseInt(this.returnedQuantity.toString());
      }

      if (this.returnedQuantity >= quantity) {
        this.returnedQuantity = this.returnedQuantityCopy;
        alert('You have exceeded maximum return value of ' + quantity);
      } else if (this.returnedQuantity <= 0) {
        this.returnedQuantity = this.returnedQuantityCopy;
        alert('Return quantity can not be less than 0');
      }
    }
  }

  onReturnQuantityIncrement() {
    const quantity = this.selectedItem.shipped_quantity;
    const uomType = this.selectedItem.uom;
    if (this.returnedQuantity >= quantity) {
      return false;
    }

    if (uomType === 'EACH') {
      this.returnedQuantity = parseInt(this.returnedQuantity.toString()) + 1;
    } else {
      let tempQty: any = parseFloat(this.returnedQuantity.toString()) + 0.01;
      tempQty = tempQty.toFixed(2);
      this.returnedQuantity = parseFloat(tempQty);
    }
  }

  onReturnQuantityDecrement() {
    if (this.returnedQuantity <= 0) {
      return false;
    }

    const uomType = this.selectedItem.uom;
    if (uomType === 'EACH') {
      if (this.returnedQuantity >= 1) {
        this.returnedQuantity = parseInt(this.returnedQuantity.toString()) - 1;
      }
    } else {
      let tempQty: any = parseFloat(this.returnedQuantity.toString()) - 0.01;
      tempQty = tempQty.toFixed(2);
      this.returnedQuantity = parseFloat(tempQty);
    }
  }

  onReturnConfirm() {
    if (this.selectedOrderReason) {
      const returndata = {
        item_id: this.selectedItem.product_number,
        return_quantity: this.returnedQuantity,
        reason: this.selectedOrderReason.description
      }
      this._store.dispatch(new ReturnOrderStart({ data: { orderId: this.orderId, return_item: returndata } }));
    } else {
      alert('Please select a reason before proceeding further');
    }
  }

  calculateDeliveredQuantity(item) {
    let quantity = parseFloat(item.shipped_quantity);
    let returnedQuantity = parseFloat(item.returned_quantity);
    return quantity - returnedQuantity;
  }

  onReasonSave() {
    if (this.selectedOrderReason) {
      this.closeModal();
      this._router.navigate(['/order-refund', this.orderId],
        {
          queryParams: {
            reasonDescription: this.selectedOrderReason.description,
            orderType: this.selectedOrderType
          }
        });
    }
  }

  closeModal() {
    $('#order-reason-modal').modal('hide');
  }

  getRoundedValues(value) {
    return parseInt(value);
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
    //form data for qrcode
    const formData = new FormData();
    formData.append('barcode', this.qrResultString);

    this.showBarcodeScanner = !this.showBarcodeScanner;
    this.orderService.getBarcodeScanner(this.orderId, formData).subscribe(res => {
      this.ngAfterViewInit();
      this.checkBarcodeMatchprod(this.qrResultString);
    }, err => {
      this.ngAfterViewInit();
      this.selectedIndex = -1;
      $("#productNotFound").modal("show");
      setTimeout(function(){
        $("#productNotFound").modal("hide");
      }, 1500);
      //alert(err.error.message);
    })
  }

  getSelctedId(item) {
    var test = this.orderDetails.order_lines.findIndex(x => x.product_number == item);
    this.selectedIndex = test;
    if (this.selectedIndex != -1) {
      var headerHeight = $(".header").height() + 60;
      $('html,body').animate({
        scrollTop: $("#" + this.selectedIndex).offset().top - headerHeight
      },
        'slow');
    }
  }

  checkBarcodeMatchprod(barcode) {
    this.orderDetails.order_lines.forEach((val, index) => {
      let code = val.barcodes.filter(b => parseInt(b) == parseInt(barcode));
      if (code.length > 0) {
        this.selectedIndex = index
        var headerHeight = $(".header").height() + 60;
        $('html,body').animate({
          scrollTop: $("#" + this.selectedIndex).offset().top - headerHeight
        },
          'slow');
        return;
      }
    })
  }

  ngOnDestroy() {
    this.actionsSubjectSubscription.unsubscribe();
  }
}
