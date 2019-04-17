import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { product } from '../classes/product_class';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import { SelectionModel } from "@angular/cdk/collections";
import { CategoryService } from '../category.service';
import { category } from '../classes/category_class';
import { IonSlides } from '@ionic/angular';
import { url } from '../../environments/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('mySlider', { read: IonSlides }) slides: IonSlides;


  selection = new SelectionModel(true, []);
  Searcharr:string;
  New_Product_list:product[]=[];
  Top_selling_list:product[]=[];
  i:number;
  ImageUrl:String[]=[];
  product_dataSource = new MatTableDataSource();
  Prod_list:any[]=[];
  Category_list:category[]=[];
  s_flag:boolean=true;
  search:string;  
  page=1;
  errorMessage:string;
  slider:IonSlides;

  endPoint:string=url.endPoints;
  constructor(private pro_ser:ProductService,private _router:Router,private cat_ser:CategoryService) { }


  slidesDidLoad(mySlider:IonSlides)
  {
    this.slider=mySlider;
    mySlider.startAutoplay();
  }
  
  onclickSlideshow(img:string)
  {
    this.slider.startAutoplay();
    console.log(img);
    for(this.i=0;this.i<this.Prod_list.length;this.i++)
    {
      if(this.Prod_list[this.i].Product_image==img)
      {
        this._router.navigate(['product-details',this.Prod_list[this.i].Product_id]);    
      }
    }
  }

  doInfinite(infiniteScroll) {
    this.page = this.page+1;
    setTimeout(() => {
      this.pro_ser.getAllProduct().subscribe(
        (data:any)=>
        {
          this.Prod_list=data;
        },
         error =>  this.errorMessage = <any>error);

      console.log('Async operation has ended');
      console.log(infiniteScroll);
      infiniteScroll.target.disabled=true;
    }, 1000);
  }


  onclickProduct(item)
  {
    console.log(item);
    this.pro_ser.redirect_url="tabs/home";
    console.log(item.Product_id);
    this._router.navigate(['product-details',item.Product_id]);
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.product_dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.product_dataSource.data.forEach(row => this.selection.select(row));
  }

  searchfilter(key:string)
  {
      this.s_flag=false;
      this.Prod_list=[];
      console.log(key);
      this.product_dataSource.filter= key.trim().toLowerCase();
      console.log(this.product_dataSource.filteredData);
      this.Prod_list=this.product_dataSource.filteredData;
      console.log(this.Prod_list);
      if(key=="")
      {
        this.s_flag=!this.s_flag;
        this.Prod_list=[];
      }
  }

  ngOnInit() {
    
    this.pro_ser.getAllProduct().subscribe(
      (data:any[])=>
      {
        this.product_dataSource.data=data;
        this.Prod_list=data;
        for(this.i=0;this.i<this.Prod_list.length;this.i++)
        {
          this.ImageUrl.push(this.Prod_list[this.i].Product_image);
        }
      }
    );

    this.pro_ser.getTopSellingProduct().subscribe(
      (data:any[])=>
      {
        console.log(data);
        this.Top_selling_list=data;
      }
    );

    this.pro_ser.getNewProduct().subscribe(
      (data:any[])=>
      {
        this.New_Product_list=data;
      }
    );

    this.cat_ser.getAllCategory().subscribe(
      (data:any[])=>
      {
        this.Category_list=data;
      }
    );
  }



}
