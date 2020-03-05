import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  activateDocument = false;
  activateCamera = false;
  activateHome = false;
  activateSignature = false;
  activateOrders = false;
  orderId: number;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    const url = this._router.url;
    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (url.indexOf('dashboard') > -1) {
          this.activateHome = true;
        } else if (url.indexOf('orders-list') > -1 || url.indexOf('order-history') > -1) {
          // console.log('url', url);
          this.activateOrders = true;
        } else if (url.indexOf('order-payment') > -1 || url.indexOf('draw-signature') > -1) {
          this.activateDocument = true;
          this.activateCamera = true;
          this.activateSignature = true;
        }
      }
    });


    this._route.params.subscribe(params => {
      this.orderId = +params['id'] || null;
    });
  }

  ngOnInit() {
  }

  resetFlags() {
    this.activateDocument = false;
    this.activateCamera = false;
    this.activateHome = false;
    this.activateSignature = false;
    this.activateOrders = false;
  }

  navigateToSignatureScreen() {
    if (this.activateSignature && this.orderId) {
      this._router.navigate(['/draw-signature', this.orderId]);
    }
  }

  ngOnDestroy() {
    this.resetFlags();
  }
}
