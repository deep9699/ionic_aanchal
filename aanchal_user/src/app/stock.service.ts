import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stock_id:string=url.endPoints+'stock_id/';

  private url:string=url.endPoints+'stock/';
    private stock_url:string=url.endPoints+'stock_details/';
    private stock_sizr_url:string=url.endPoints+'stock_size/'
  constructor(private _http:HttpClient) { }

  getDetailsByProductid(Product_id:number){
    return this._http.get(this.stock_url+Product_id);
  }
  getstockid(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.stock_id,body,{headers:_abc});
  }
  getStockById(id:number)
  {
    return this._http.get(this.url+id);
   }

   updateStock(item){
    //console.log("xyz");
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url,body,{headers:head1});
  }
  getStockByColorSizeId(selected_color_size_id)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(selected_color_size_id);
    return this._http.post(this.stock_sizr_url,body,{headers:_abc});
  }


}
