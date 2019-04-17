import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { category } from '../classes/category_class';
import { ProductService } from '../product.service';
import { product } from '../classes/product_class';
import { color } from '../classes/color_class';
import { size } from '../classes/size_class';
import { ColorService } from '../color.service';
import { SizeService } from '../size.service';
import { Router } from '@angular/router';
import { AlertController } from "@ionic/angular";
import { MenuController } from '@ionic/angular';
import { StockService } from '../stock.service';
import { url } from '../../environments/environment';

export class color_size_id
{
  constructor(public color_id:number[],public size_id:number[]){}
  
}


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor(private stock_ser:StockService,private menu:MenuController,private cat_ser:CategoryService,private pro_ser:ProductService,private color_ser:ColorService,private size_ser:SizeService,private _router:Router) { }

  selected_color_size_id:color_size_id;

  Category_list:category[]=[];
  Product_list:product[]=[];
  tmp_pro_list:product[]=[];
  Category_id:number;
  Color_list:color[]=[];
  Size_list:size[]=[];
  pro_size_flag:number=0;
  pro_color_flag:number=0;
  i:number;
  j:number;
  k:number;

  endPoint:string=url.endPoints;

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  
  ngOnInit() {
    this.selected_color_size_id=new color_size_id([],[]);
    this.cat_ser.getAllCategory().subscribe(
      (data: any[]) => {
        console.log(data);
        this.Category_list = data;
      });
      this.pro_ser.getAllProduct().subscribe(
        (data:product[])=>{
          this.Product_list=data;
          this.tmp_pro_list=this.Product_list;
        });
    
        this.color_ser.getAllColor().subscribe(
          (data:color[])=>
          {
            this.Color_list=data;
          }
        );
    
        this.size_ser.getAllSize().subscribe(
          (data:size[])=>
          {
            this.Size_list=data;
          }
        );
  }



  onclickCategory(item:category)
  {
    this.Product_list=[];
    this.Category_id=item.Category_id;
    this.pro_ser.getProductByCategoryId(this.Category_id).subscribe(
      (data:any[])=>
      {
        console.log(data);
        this.Product_list=data;
      }
    );
    this.menu.close();
  }

  onclickProduct1(item)
  {
    console.log(item);
    this.pro_ser.redirect_url="tabs/category";
    this._router.navigate(['product-details',item.Product_id]);
  }


  onClickColor(item:color)
  {
    if (this.selected_color_size_id.color_id.find(x => x == item.Color_id)) {
      this.selected_color_size_id.color_id.splice(this.selected_color_size_id.color_id.indexOf(item.Color_id), 1);
    } else {
      this.selected_color_size_id.color_id.push(item.Color_id);
    }

   this.stock_ser.getStockByColorSizeId(this.selected_color_size_id).subscribe(
     (data:any[])=>
     {
       console.log(data);
        this.Product_list=[];
        for(this.i=0;this.i<data.length;this.i++)
        {
          for(this.j=0;this.j<this.tmp_pro_list.length;this.j++)
          {
            if(data[this.i].Fk_product_id==this.tmp_pro_list[this.j].Product_id)
            {
              for(this.k=0;this.k<this.Product_list.length;this.k++)
              {
                this.pro_size_flag=0;
                if(this.Product_list.findIndex(x => x==this.tmp_pro_list[this.j])>=0)
                {
                  this.pro_color_flag=1;
                  break;
                }
              }
              if(this.pro_color_flag==1)
              {
                this.pro_color_flag=0;
              }
              else
              {
                this.Product_list.push(this.tmp_pro_list[this.j]);
              }
            }
          }
        }
     }
   );
  }

  onClickSize(item:size)
  {
    this.Product_list=[];

    if (this.selected_color_size_id.size_id.find(x => x == item.Size_id)) {
      this.selected_color_size_id.size_id.splice(this.selected_color_size_id.size_id.indexOf(item.Size_id), 1);
    } else {
      this.selected_color_size_id.size_id.push(item.Size_id);
    }

    this.stock_ser.getStockByColorSizeId(this.selected_color_size_id).subscribe(
      (data:any)=>
      {
        console.log(data);
        for(this.i=0;this.i<data.length;this.i++)
        {
          for(this.j=0;this.j<this.tmp_pro_list.length;this.j++)
          {
            if(data[this.i].Fk_product_id==this.tmp_pro_list[this.j].Product_id)
            {
              for(this.k=0;this.k<this.Product_list.length;this.k++)
              {
                this.pro_size_flag=0;
                if(this.Product_list.findIndex(x => x==this.tmp_pro_list[this.j])>=0)
                {
                  this.pro_size_flag=1;
                  break;
                }
              }
              if(this.pro_size_flag==1)
              {
                this.pro_size_flag=0;
              }
              else
              {
                this.Product_list.push(this.tmp_pro_list[this.j]);
              }

            }
          }
        }
      }
    );
  }


}
