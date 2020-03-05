import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ORDER_TYPES } from 'src/app/core/constants/order-types.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  orderTypes = ORDER_TYPES;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  navigateToScreen(orderType) {
    this._router.navigate(['/orders-list'], { queryParams: { orderType } });
  }
}
