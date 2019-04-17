import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { CartService } from '../cart.service';
import { BillService } from '../bill.service';
import { Router } from '@angular/router';

export class TableDetails {
  constructor(
    public Bill_details_id: number,
    public Fk_bill_id: number,
    public Fk_customer_id: number,
    public Fk_stock_id: number,
    public Quantity: number,
    public Amount: number,
    public Color_name: string,
    public Product_name: string,
    public Product_price: number,
    public Size_name: string,
    public Bill_date: Date,
    public Product_image: string,
    public Product_desc: string
  ) {}
}

@Component({
  selector: 'app-past-order',
  templateUrl: './past-order.page.html',
  styleUrls: ['./past-order.page.scss'],
})
export class PastOrderPage implements OnInit {

  Email_id:string="";
  Customer_id:number;
  Order_details:TableDetails[]=[];
  log_flag:number=1;
  bill_arr:TableDetails[]=[];
  constructor(private cust_ser:CustomerService,private bill_ser:BillService,private _router:Router) { }

  onclickBack()
  {
    this._router.navigate(['tabs/user']);
  }

  ngOnInit() {
    this.Email_id=localStorage.getItem('email_id');
    this.Customer_id=parseInt(localStorage.getItem('customer_id'));

    if(this.Email_id==null)
    {
      this.log_flag=0;
    }
    else
    {
      
      this.bill_ser.getBillDetialsByCustomerId(this.Customer_id).subscribe(
        (data: TableDetails[])=>
        {
          console.log(data);
          if(data.length==0)
          {
            this.log_flag=2;
          }
          else
          {
          this.log_flag=1;
          this.bill_arr = data;
          console.log(this.bill_arr);
          }
        });  
    
    }
  }

}
