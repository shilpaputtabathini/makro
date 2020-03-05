import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ORDER_TYPES } from 'src/app/core/constants/order-types.constant';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: any;
  cancelledList: any;
  selectedTab: any

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getSelectedTabTd('delivered');
  }

  getSelectedTabTd(type) {
    this.selectedTab = type;
    this.orderService.getOrderHistoryList(type).subscribe(data =>{
      this.orderHistory = data['data'].orders;
    })
  }

}
