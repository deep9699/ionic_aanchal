import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private url=url.endPoints+'color/';
  private delete_color=url.endPoints+'color_delete/';
  private stock_color=url.endPoints+'sizebycolor/';
  
  constructor(private _http:HttpClient) { }
  getAllColor(){
    return this._http.get(this.url);
  }
  getColorById(id)
  {
    return this._http.get(this.url+id);
  }
  getStockById(id)
  {
    return this._http.get(this.stock_color+id);
  }

}
