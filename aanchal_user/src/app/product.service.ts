import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url=url.endPoints+'product/';
  private pro_url=url.endPoints+'product_user/';
  private product_route=url.endPoints+'product_router/';
  private product_delete=url.endPoints+'product_delete_router/';


  redirect_url="";
  constructor(private _http:HttpClient) { }
  getAllProduct(){
    return this._http.get(this.url);
  }
  getProductById(id){
    return this._http.get(this.url+id);
  }
  getNewProduct(){
    return this._http.get(this.pro_url);
  }
  getProductByCategoryId(id){
    return this._http.get(this.product_route+id);
  }
  getTopSellingProduct()
  {
    return this._http.get(this.product_delete);
  }
}
