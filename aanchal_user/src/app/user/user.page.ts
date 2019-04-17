import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private _router:Router) {}
  Email_id:string="";
  Customer_id:number=0;
  log_flag:boolean=true;
 
  onclickSignUp()
  {
    this._router.navigate(['sign-up']);
  }
  onclickPastOrder()
  {
    this._router.navigate(['past-order']);
  }
  onclickProfie()
  {
    this._router.navigate(['manage-profile']);
  }
  onclickAddress()
  {
    this._router.navigate(['manage-address']);
  }
  onclickSupport()
  {
    this._router.navigate(['customer-support']);
  }
  onclickAboutUs()
  {
    this._router.navigate(['about-us']);
  }
  ngOnInit() {
    this.log_flag=true;
    this.Email_id=localStorage.getItem('email_id');
    this.Customer_id=parseInt(localStorage.getItem('customer_id'));
    if(this.Email_id==null)
    {
      this.log_flag=false;
    }
  }
  onclickLogOut()
  {
    localStorage.removeItem('email_id');
    localStorage.removeItem('customer_id');
    this.ngOnInit();
    window.location.reload();
    this._router.navigate(['tabs/home']);
  }
}
