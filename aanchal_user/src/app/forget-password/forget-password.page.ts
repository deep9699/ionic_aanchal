import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';


export class changepassclass
{
  constructor(
    public Email_id:string,
    public Password:string
  ){}
}

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  email_id:string;
  check_code:number;
  code:number;
  new_password:string;
  repeat_password:string;

  constructor(private cus_ser:CustomerService,private _router:Router) { }

  ngOnInit() {
    this.check_code=parseInt(localStorage.getItem('code'));
    console.log(this.check_code);
    this.email_id=localStorage.getItem('Email_id');
    console.log(this.check_code);
  }

  onclickchangepassword()
  {
    console.log(this.code);
    if(this.check_code==this.code)
    {
      if(this.new_password==this.repeat_password)
      {
        this.cus_ser.changePassword(new changepassclass(this.email_id,this.new_password)).subscribe(
          (data:any)=>
          {
            console.log(data);
            alert("Password Changes");
            this._router.navigate(['log-in']);
          }
        );
      }
    }
    else
    {
      alert("Invalid Code");
    }
  }
  onclickBack()
  {
    this._router.navigate(['log-in']);
  }


}
