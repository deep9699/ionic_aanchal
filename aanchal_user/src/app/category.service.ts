import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { category } from './classes/category_class';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url=url.endPoints+'category/';
  private delete_cat=url.endPoints+'category_delete/';
  constructor(private _http:HttpClient) { }
  getAllCategory(){
    return this._http.get(this.url);
  }
  getCategoryById(id)
  {
    return this._http.get(this.url+id);
  }
  addCategory(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.url,body,{headers:_abc});
  }
  deleteProduct(item)
  {
    return this._http.delete(this.url+item.Category_id);
  }
  deleteAll(item:category[])
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.delete_cat,body,{headers:_abc});
  }
  updateCategory(item:category)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.url,body,{headers:_abc});
  }


}
