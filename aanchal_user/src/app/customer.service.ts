import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { customer } from './classes/customer_class';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url=url.endPoints+'customer/';
  private cust_url=url.endPoints+'customer_log_in/';
  private customer_url=url.endPoints+'insertcustomer/';
  private customer=url.endPoints+'last_id/';
  private email_url=url.endPoints+'email/';
  constructor(private _http:HttpClient) { }


  public redirect_url:string="";

  log_in_customer(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.post(this.cust_url,body,{headers:_abc});
  }

  sentMail(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.post(this.email_url,body,{headers:_abc});
  }

  changePassword(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.put(this.customer,body,{headers:_abc});
  }

  GetAllCustomer()
  {
    return this._http.get(this.url);
  }

  addCustomer(item:customer){
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.customer_url,body,{headers:_abc});
  }

  UpdateCustomer(item:any){
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.url,body,{headers:_abc});
  }

  Cusrtomer_login(id)
  {
    return this._http.get(this.cust_url+id);
  }
  getCustomerById(id:number){
    return this._http.get(this.url+id);
  }
  Add_Address(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.customer,body,{headers:_abc});
  }

}
