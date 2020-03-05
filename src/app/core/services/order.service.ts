import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = environment.apiUrl;

  returnOrderSuccess = new BehaviorSubject(null);
  returnOrderSuccessChange$ = this.returnOrderSuccess.asObservable();

  returnOrderFailure = new BehaviorSubject(null);
  returnOrderFailureChange$ = this.returnOrderFailure.asObservable();

  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) { }

  getOrdersList(status?) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    let url = `${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}`;
    if (status) {
      url += `?status=${status}`;
    }
    return this._http.get(url, { headers });
  }

  getOrderDetails(orderId) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.get(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}/${orderId}`, { headers });
  }

  cancelOrder(data) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.post(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}/${data.orderId}/${API_ENDPOINTS.CANCEL_ORDER}`
      , data, { headers });
  }

  getReasonCodes(status) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.get(`${this.apiUrl}${API_ENDPOINTS.REASON_CODES}${status}`, { headers });
  }

  getOrderHistoryList(type) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.get(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}?status=${type}`, { headers });
  }

  getTypeOfPaymentIS(data) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.post(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}/${data.orderId}/update_payment_status`, {}, { headers });
  }

  confirmOrderLine(data) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.post(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}/${data.orderId}/${API_ENDPOINTS.CONFIRM_ORDER}`,
      { order_line_id: data.order_line_id }, { headers });
  }

  confirmAll(orderId) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.post(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}/${orderId}/${API_ENDPOINTS.CONFIRM_ALL}`,
      {}, { headers });
  }

  returnOrderline(data) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.post(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}/${data.orderId}/${API_ENDPOINTS.RETURN_ORDER}`,
      { return_item: data.return_item }, { headers });
  }

  getBarcodeScanner(orderId, data) {
    // alert(orderId)
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.post(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}/${orderId}/${API_ENDPOINTS.SCAN_PRODUCT}`,
      data, { headers });
  }

  getCurrentPaymentStatus(orderId) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.get(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}/${orderId}/payment_status`, { headers });
  }

  setOrderMarkAsReady(orderId) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.patch(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}/${orderId}/${API_ENDPOINTS.MARK_AS_READY}`, null, { headers });
  }

  setOrderMarkAsReattempt(orderId, reason, return_order_number) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.put(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}/${orderId}/${API_ENDPOINTS.MARK_AS_REATTEMPT}`, { reason, return_order_number }, { headers });
  }

  drawSignature(orderId, formData) {
    const headers = new HttpHeaders({ 'Authorization': this._authService.getToken() });
    return this._http.post(`${this.apiUrl}${API_ENDPOINTS.ORDERS_LIST}/${orderId}/${API_ENDPOINTS.DRAW_SIGNATURE}`,
      formData, { headers });
  }

  checkIfReturnOrder(orderDetails) {
    let isReturnOrder = false;
    const items = orderDetails.order_lines;
    for (let item of items) {
      const returnedQuantity = parseFloat(item.returned_quantity);
      if (returnedQuantity > 0) {
        isReturnOrder = true;
        break;
      }
    }

    return isReturnOrder;
  }
}
