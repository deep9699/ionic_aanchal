import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private url=url.endPoints+'size/';
  private stock_url=url.endPoints+'stock_size/';
  constructor(private _http:HttpClient) { }
  getAllSize(){
    return this._http.get(this.url);
  }
  getStockById(id)
  {
    return this._http.get(this.stock_url+id);
  }
}
