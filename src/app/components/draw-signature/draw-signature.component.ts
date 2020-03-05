import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';

import { IAppState } from 'src/app/app.reducer';
import { ORDER_TYPES } from 'src/app/core/constants/order-types.constant';
import { EOrderDetailsActions, GetOrderDetailsStart, DrawSignatureStart } from '../order-details/order-details.actions';
import { OrderService } from 'src/app/core/services/order.service';
import { DomService } from 'src/app/core/services/dom.service';

declare var SignaturePad: any;

@Component({
  selector: 'app-draw-signature',
  templateUrl: './draw-signature.component.html',
  styleUrls: ['./draw-signature.component.scss']
})
export class DrawSignatureComponent implements OnInit, AfterViewInit, OnDestroy {
  signaturePad: any;
  orderDate: any;
  orderId: number;
  orderDetails: any;
  actionsSubjectSubscription: Subscription;
  orderTypes = ORDER_TYPES;
  selectedOrderType = this.orderTypes.DELIVERY_ORDERS;
  receiverName: string = '';
  paymentStatus: string = '';
  isReturnOrder = false;
  currentDate = new Date();
  orderReceivedDate = {
    year: this.currentDate.getFullYear(),
    month: this.currentDate.getMonth() + 1,
    day: this.currentDate.getDate()
  };
  signatureImage: any;

  @ViewChild('signatureCanvasRef', { static: false }) signatureCanvasRef: ElementRef;
  @ViewChild('headerRef', { static: false }) headerRef: ElementRef;
  @ViewChild('wrapperRef', { static: false }) wrapperRef: ElementRef;
  @ViewChild('navigationBarContainerRef', { static: false }) navigationBarContainerRef: ElementRef;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _actionsSubject: ActionsSubject,
    private _store: Store<IAppState>,
    private _router: Router,
    private _orderService: OrderService,
    private _domService: DomService
  ) {

    this._activatedRoute.queryParams.subscribe(queryParams => {
      this.selectedOrderType = queryParams['orderType'] || this.orderTypes.DELIVERY_ORDERS;
    });

    this._activatedRoute.params.subscribe(params => {
      this.orderId = +params['id'] || null;
      if (this.orderId) {
        this.getOrderDetails(this.orderId);
      }
    });

    this.actionsSubjectSubscription = this._actionsSubject.subscribe((action: any) => {
      switch (action.type) {
        case EOrderDetailsActions.GetOrderDetailsSuccess:
          this.orderDetails = action.payload.data.data.order || null;
          this.isReturnOrder = this._orderService.checkIfReturnOrder(this.orderDetails);
          this.receiverName = `${this.orderDetails.shipment_address.first_name} ${this.orderDetails.shipment_address.last_name}`;
          break;
        case EOrderDetailsActions.DrawSignatureSuccess:
          this._router.navigate(['/dashboard']);
          break;
        case EOrderDetailsActions.DrawSignatureFailure:
          alert(action.payload.error.error.message);
          break;
      }
    });
  }

  ngOnInit() {
    this._orderService.getCurrentPaymentStatus(this.orderId).subscribe((data: any) => {
      this.paymentStatus = data.data.order.payment_status.trim();
    });
  }

  ngAfterViewInit() {
    // this.signaturePad = new SignaturePad(this.signatureCanvasRef.nativeElement, {
    //   penColor: '#000',
    //   drawOnly: true
    // });
    this._domService.adjustLayout(null, this.wrapperRef, this.navigationBarContainerRef);
  }

  saveSignature(blob: Blob) {
    this.signatureImage = blob;
  }

  clearSignature() {
    this.signatureImage = null;
  }

  getOrderDetails(orderId) {
    this._store.dispatch(new GetOrderDetailsStart({ data: { orderId } }));
  }

  onDateSelect(event, orderDateRef) {
    const { day, month, year } = event;
    this.orderDate = `${day}/${month}/${year}`;
    orderDateRef.close();
  }

  onSignatureSave() {
    // if (this.signaturePad.toDataURL() && this.receiverName && this.orderDate) {
    //   const formData = new FormData();
    //   const file = this.dataURItoBlob(this.signaturePad.toDataURL());
    //   formData.append('receiver_name', this.receiverName);
    //   formData.append('received_date', this.orderDate);
    //   formData.append('signature', file);
    //   this._store.dispatch(new DrawSignatureStart({ data: { orderId: this.orderId, formData } }));
    // } else {
    //   alert('Please enter all the details');
    // }
    if (this.signatureImage || this.receiverName || this.orderDate) {
      const formData = new FormData();
      const file = new File([this.signatureImage], 'signature.png', { type: 'image/png' });
      if (this.signatureImage) {
        // formData.append('signature', this.signatureImage);
        formData.append('signature', file);
      }
      if (this.receiverName) {
        formData.append('receiver_name', this.receiverName);
      }
      if (this.orderDate) {
        formData.append('received_date', this.orderDate);
      } else {
        const { day, month, year } = this.orderReceivedDate;
        this.orderDate = `${day}/${month}/${year}`;
        formData.append('received_date', this.orderDate);
      }
      this._store.dispatch(new DrawSignatureStart({ data: { orderId: this.orderId, formData } }));
    } else {
      alert('Please enter all the details');
    }

  }

  // dataURItoBlob(dataURI) {
  //   // convert base64 to raw binary data held in a string
  //   // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  //   var byteString = atob(dataURI.split(',')[1]);

  //   // separate out the mime component
  //   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  //   // write the bytes of the string to an ArrayBuffer
  //   var ab = new ArrayBuffer(byteString.length);
  //   var ia = new Uint8Array(ab);
  //   for (var i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }

  //   //Old Code
  //   //write the ArrayBuffer to a blob, and you're done
  //   //var bb = new BlobBuilder();
  //   //bb.append(ab);
  //   //return bb.getBlob(mimeString);

  //   //New Code
  //   return new Blob([ab], { type: mimeString });
  // }

  ngOnDestroy() {
    this.actionsSubjectSubscription.unsubscribe();
  }
}
