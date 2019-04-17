import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { StockService } from '../stock.service';
import { CartService } from '../cart.service';
import { CustomerService } from '../customer.service';
import { cart } from '../classes/cart_class';
import { url } from '../../environments/environment';

export class getCartid {
  constructor(public Fk_customer_id:number, public Fk_stock_id:number) {}
}


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  Product_id:number;
  Stock_id:number;
  Product_Stock:any[]=[];
  Product_name:string="";
  Product_desc:string="";
  Product_img:string="";
  Product_price:number;
  i:number;
  Sizes:string[]=[];
  Colors:string[]=[];
  Selected_color:string="";
  Selected_size:string="";
  Customer_id:number
  email_id:string="deepbhavsar9@gmail.com";
  j:number;
  qty=1;
  size_flag:number=0;
  color_flag:number=0;
  flag:boolean=true;
  s_flag:boolean=false;
  c_flag:boolean=false;
  endPoint:string=url.endPoints;
  constructor(private _actroute:ActivatedRoute,private _router:Router,private pro_ser:ProductService,private stock_ser:StockService,private cart_ser:CartService,private cust_ser:CustomerService) { }


  onclickAddCart()
  {

    if(this.flag==true && this.Selected_size!="" && this.Selected_color!="")
    {
      this.cust_ser.Cusrtomer_login(this.email_id).subscribe(
        (data:any)=>
        {
           this.Customer_id=data[0].Customer_id;
          console.log(this.Customer_id);
          console.log(this.Stock_id);
           this.cart_ser.checkCartId(new getCartid(this.Customer_id,this.Stock_id)).subscribe(
             (data:any)=>
             {
              console.log(data);
              console.log(data);

              if(data.length==1)
              {
                alert("Item is already on your cart");
              }

              else
              {
                    this.cart_ser.InsertIntoCart(new cart(this.Stock_id,this.Customer_id,this.qty)).subscribe(
                    (data:any)=>
                    {
                      console.log(data);
                      this._router.navigate(['cart']);
                    }
                  );
              }
          }
       )
      }
    );
  }
  else
  {
    alert("pls select size & color ");
  }
}

  onclick_Size(item:string)
  {
    this.Selected_size=item;
    console.log(this.Selected_size);
      if(this.c_flag==false)
      {
        this.Selected_color="";
        this.Colors=[];
        for(this.i=0;this.i<this.Product_Stock.length;this.i++)
        {
          if(this.Product_Stock[this.i].Size_name==item)
          {
            this.Colors.push(this.Product_Stock[this.i].Color_name);
          }
        }
        this.s_flag=true;
      }
      else
      {
        for(this.i=0;this.i<this.Product_Stock.length;this.i++)
        {

          if(this.Product_Stock[this.i].Size_name==this.Selected_size && this.Product_Stock[this.i].Color_name==this.Selected_color)
          {

            this.Stock_id=this.Product_Stock[this.i].Stock_id;
            console.log(this.Stock_id);
            break;
          }
        }
      }
    
  }

  onclick_Color(item)
  {
    this.Selected_color=item;
    console.log(this.Selected_color);
    if(this.s_flag==false)
    {
      this.Selected_size="";
      this.Sizes=[];
        for(this.i=0;this.i<this.Product_Stock.length;this.i++)
        {
          if(this.Product_Stock[this.i].Color_name==item)
          {
            this.Sizes.push(this.Product_Stock[this.i].Size_name);
          }
        }
        this.c_flag=true;
    }
    else
    {
      for(this.i=0;this.i<this.Product_Stock.length;this.i++)
      {

        if(this.Product_Stock[this.i].Size_name==this.Selected_size && this.Product_Stock[this.i].Color_name==this.Selected_color)
        {

          this.Stock_id=this.Product_Stock[this.i].Stock_id;
          console.log(this.Stock_id);
          break;
        }
      }
    }
  }
  

  onclickBack()
  {
    this._router.navigate([this.pro_ser.redirect_url]);
  }

  ngOnInit() {
    this._actroute.params.subscribe((x: Params) => {
        this.Product_id = x['id'];
        console.log(this.Product_id);
      }
    );

    this.pro_ser.getProductById(this.Product_id).subscribe(
      (data:any[])=>
      {
        console.log(data);
        this.Product_name=data[0].Product_name;
        this.Product_desc=data[0].Product_desc;
        this.Product_img=data[0].Product_image;
        this.Product_price=data[0].Product_price;
      }
    );

    this.stock_ser.getDetailsByProductid(this.Product_id).subscribe(
      (data:any[])=>
      {
        console.log(data);
        this.Product_Stock=data;
        for(this.i=0;this.i<data.length;this.i++)
        {
          this.size_flag=0;
          for(this.j=0;this.j<this.Sizes.length;this.j++)
          {
            if(this.Sizes[this.j]==data[this.i].Size_name)
            {
              this.size_flag=1;
              break;
            }
          }
          if(this.size_flag==0)
          {
            this.Sizes.push(data[this.i].Size_name);
          }
        }
        for(this.i=0;this.i<data.length;this.i++)
        {
          this.color_flag=0;
          for(this.j=0;this.j<this.Colors.length;this.j++)
          {
            if(this.Colors[this.j]==data[this.i].Color_name)
            {
              this.color_flag=1;
              break;
            }
          }
          if(this.color_flag==0)
          {
            this.Colors.push(data[this.i].Color_name);
          }
        }
      }
    );

  }

}
