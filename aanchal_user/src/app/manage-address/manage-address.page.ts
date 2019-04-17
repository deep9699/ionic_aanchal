import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { customer } from '../classes/customer_class';


class address_customer
{
  constructor(public Customer_id:number,public Address:string){}
}

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.page.html',
  styleUrls: ['./manage-address.page.scss'],
})
export class ManageAddressPage implements OnInit {

  Email_id:string;
  customer_id:number;
  Name:string;
  Address:string;
  flag:boolean;

  constructor(private _router:Router,private cust_ser:CustomerService) { }


  onclickBack()
  {
    this._router.navigate(['tabs/user']);
  }
  onAddressdone()
  {
    this.cust_ser.Add_Address(new address_customer(this.customer_id,this.Address)).subscribe(
      (data:any)=>
      {
        console.log(data);
        this._router.navigate(['tabs/user']);
      }
    );
  }


  ngOnInit() {
    this.customer_id=parseInt(localStorage.getItem('customer_id'));
    this.cust_ser.getCustomerById(this.customer_id).subscribe(
      (data:customer)=>
      {
        console.log(data);
        this.Name=data[0].Name;
        this.Email_id=data[0].Email_id;
        this.Address=data[0].Address;
        if(this.Address==null)
        {
          this.flag=false;
        }
        else
        {
          this.flag=true;
        }
      }
    );
  }

}
