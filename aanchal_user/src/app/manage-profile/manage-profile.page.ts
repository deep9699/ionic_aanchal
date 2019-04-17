import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { customer } from '../classes/customer_class';

class update_customer{
  constructor(public Customer_id:number,public Mobile_no:string,public Gender:string,public DOB:Date){}
}

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.page.html',
  styleUrls: ['./manage-profile.page.scss'],
})
export class ManageProfilePage implements OnInit {

  Email_id:string;
  customer_id:number;
  Name:string;
  mobile_no:string;
  dob:Date;
  gender:string;
  g_flag:boolean;

  constructor(private _router:Router,private cust_ser:CustomerService) { }

  ngOnInit() {
    
    this.customer_id=parseInt(localStorage.getItem('customer_id'));
    console.log(this.customer_id);
    this.cust_ser.getCustomerById(this.customer_id).subscribe(
      (data:customer)=>
      {
        console.log(data);
        console.log(data);
        this.Name=data[0].Name;
        this.Email_id=data[0].Email_id;
        this.mobile_no=data[0].Mobile_no;
        this.dob=data[0].DOB;        
        this.gender=data[0].Gender;

        if(this.gender=='Male')
        {
          this.g_flag=true;
        }
        else
        {
          this.g_flag=false;
        }
      }
    );
  }


  onUpdate()
  {
    this.cust_ser.UpdateCustomer(new update_customer(this.customer_id,this.mobile_no,this.gender,this.dob)).subscribe(
      (data:any)=>
      {
        console.log(data);
        this._router.navigate(['tabs/user']);
      }
    );
  }

  onclickgender(gender:string)
  {
    this.gender=gender;
  }

  onclickBack()
  {
    this._router.navigate(['tabs/user']);
  }

}
