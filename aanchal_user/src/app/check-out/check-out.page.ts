import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CartService } from '../cart.service';
import { Order } from '../classes/order_class';
import { url } from '../../environments/environment';

export class checkout {
  constructor(
    public Product_id: number,
    public Cart_id: number,
    public Color_name: string,
    public Fk_customer_id: number,
    public Fk_stock_id: number,
    public Product_name: string,
    public Product_price: number,
    public Product_image:string,
    public Quantity: number,
    public Size_name: string
  ) {}
}

export class add_Address{
  constructor(public Customer_id:number,public Address:string){}
}

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
})
export class CheckOutPage implements OnInit {

  email_id:string;
  Customer_id:number;
  add_flag:boolean=true;
  Address:string;
  Name:string;
  Mobile_no:string;
  check_out: checkout[];
  i:number;
  j:number;
  cnt:number=0;
  cart_id:number;
  total:number=0;
  endPoint:string=url.endPoints;
  constructor(private _router:Router,private cust_ser:CustomerService,private cart_ser:CartService) { }

  AddAddress()
  {
    this.cust_ser.Add_Address(new add_Address(this.Customer_id,this.Address)).subscribe(
      (data:any)=>
      {
        this.add_flag=true;
        console.log(data);
        this.ngOnInit();
      }
    );
  }

  onclickBack()
  {
    this._router.navigate(['tabs/cart']);
  }

  oncheckout() {
    console.log(this.check_out);
    if(this.Address="")
    {
      alert("please Add Address First");
    }
    else
    {
      for(this.i=0;this.i<this.check_out.length;this.i++)
      {
          this.cart_id=this.check_out[this.i].Cart_id;
          this.cart_ser.AddOrder(new Order(this.check_out[this.i].Fk_stock_id,this.check_out[this.i].Fk_customer_id,this.check_out[this.i].Quantity,"Order Placed")).subscribe(
          (data:any)=>{
            console.log(data); 
            this.cnt++;
            console.log(this.cnt);
            if(this.cnt==this.check_out.length)
            {
              for(this.j=0;this.j<this.cnt;this.j++)
              {
                this.cart_ser.removeFromCart(this.check_out[this.j].Cart_id).subscribe(
                  (data:any)=>
                  {
                    console.log(data+"remove from cart");
                    this._router.navigate(['tabs/home']);
                  }
                );
              }
            }
          }
        );
      }  
    }
    
  }

  ngOnInit() {
    this.total=0;
    this.email_id = localStorage.getItem("email_id");
    console.log(this.email_id);
    this.cust_ser.Cusrtomer_login(this.email_id).subscribe(
      (data: any) => {
      this.Customer_id = data[0].Customer_id;
      this.Name=data[0].Name;
      this.Address=data[0].Address;
      this.Mobile_no=data[0].Mobile_no;
      console.log(data);
      if(data[0].Address=="")
      {
        this.add_flag=false;
      }
      console.log(this.Customer_id);
      this.cart_ser.getCartByCustomerId(this.Customer_id).subscribe((data: any) => {
          console.log(data);
          this.check_out = data;
          console.log(this.check_out);
          for (this.i = 0; this.i < data.length; this.i++) {
            this.total += (data[this.i].Product_price*data[this.i].Quantity);
          }
        });
    });
  }



}
