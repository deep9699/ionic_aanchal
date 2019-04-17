import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { cart } from './classes/cart_class';
import { Order } from './classes/order_class';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http:HttpClient) { }

  private cart_url:string=url.endPoints+'cart/';
  private cart_id_url:string=url.endPoints+'cart_id/';
  private order_url:string=url.endPoints+'order/';
  getAllCart()
  {
    return this._http.get(this.cart_url);
  }
  getCartByCustomerId(id)
  {
    return this._http.get(this.cart_url+id);
  }
  getCartTotalByCustomerId(id)
  {
    return this._http.get(this.cart_id_url+id);
  }
  removeFromCart(id)
  {
    return this._http.delete(this.cart_url+id);
  }
  InsertIntoCart(item:cart)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.cart_url,body,{headers:head1});
  }
  checkCartId(item)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.cart_id_url,body,{headers:head1});
  }

  getOrderById(id:number)
  {
    return this._http.get(this.order_url+id);
  }
  AddOrder(item:Order)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.order_url,body,{headers:head1});
  }
  RemoveOrder(id:number)
  {
    this._http.delete(this.order_url+id);
  }
}
