import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CartService } from '../cart.service';
import { url } from '../../environments/environment';


export class TableDetais {
  constructor(
    public Cart_id: number,
    public Fk_stock_id: number,
    public Product_name: string,
    public Supplier_name: string,
    public Color_name: string,
    public Size_name: string,
    public Quantity: number,
    public Product_price: number,
    public Product_image:string
  ) {}
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  Email_id:string;
  Customer_id:number;
  Cart_details: TableDetais[] = [];
  log_flag:number=0;
  i:number;
  Total: number = 0;
  cart_len:number=0;

  endPoint:string=url.endPoints;

  constructor(private _router:Router,private cust_ser:CustomerService,private cart_ser:CartService) { }
  
  onclickLogin()
  {
    this.cust_ser.redirect_url="tabs/cart";
    this._router.navigate(['log-in']);    
  }
  clickOnCheckOut() {
    this._router.navigate(["check-out"]);
  }

  ngOnInit() {
    console.log("this");
    this.Total=0;
    this.Email_id=localStorage.getItem('email_id');
    this.Customer_id=parseInt(localStorage.getItem('customer_id'));

    if(this.Email_id==null)
    {
      this.log_flag=0;
    }
    else
    {
      
      this.cust_ser.Cusrtomer_login(this.Email_id).subscribe((data: any) => {
        this.Customer_id = data[0].Customer_id;
        this.cart_ser.getCartByCustomerId(this.Customer_id).subscribe((data: any[]) => {
            console.log(data);
            this.cart_len=data.length;
            if (data.length >= 1) 
            {
              this.log_flag = 1;
              this.Cart_details = data;
              console.log(this.Cart_details);
              for (this.i = 0; this.i < this.Cart_details.length; this.i++) 
              {
                this.Total += (this.Cart_details[this.i].Product_price*this.Cart_details[this.i].Quantity);
              }
            }
            else 
            {
              this.log_flag = 2;
            }
          }); 
      });
    }
    }
    oncart_Delete(item) {
      console.log(item);
      this.cart_ser.removeFromCart(item.Cart_id).subscribe(
        (data:any)=>{
          console.log(data);
          this.ngOnInit();
        }
      )
    }
    
  }


