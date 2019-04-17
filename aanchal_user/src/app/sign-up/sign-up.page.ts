import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CustomerService } from '../customer.service';
import { customer } from '../classes/customer_class';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {


  Email_id: string;
  Password: string;
  Repassword: string;
  flag: boolean = false;
  i: number = 0;
  j: number = 0;
  k: number = 0;
  Name:string;
  pass_flag:boolean=true;
  pass1_flag:boolean=true;
  customer_Email: string[] = [];

  constructor(private formBuilder: FormBuilder,private _router:Router,private cust_ser:CustomerService) { }

  
  registerForm: FormGroup;
  submitted = false;

  onPass1_flag()
  {
    this.pass1_flag=!this.pass1_flag;
  }
  onPass_flag()
  {
    this.pass_flag=!this.pass_flag;
  }
  onclickBack()
  {
    this._router.navigate(['tabs/user']);
  }  
  onClickLogin()
  {
    this.cust_ser.redirect_url="tabs/user";
    this._router.navigate(['log-in']);    
  }

  ngOnInit() {
    this.cust_ser.GetAllCustomer().subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < data.length; this.i++) {
        this.k = this.k + 1;
        this.customer_Email.push(data[this.i].Email_id);
      }
    });

    
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      name: ["", [Validators.required]],
    });
 
 }

 
 get f() {
  return this.registerForm.controls;
}
  

  onSubmit()
  {
    this.submitted = true;
    if(this.registerForm.invalid)
    {
      return;

    }
    else
    {
 
        if (this.Password == this.Repassword)
        {
          console.log(this.customer_Email);
          console.log(this.customer_Email.length);
          for (this.j = 0; this.j < this.customer_Email.length; this.j++) {
            if (this.Email_id == this.customer_Email[this.j]) {
              alert("Email id already exits");
              this.flag = true;
              break;
            }
          }
          this.cust_ser.addCustomer(new customer(this.Email_id, this.Password,this.Name, 1)).subscribe(
            (data: any) => {
              localStorage.setItem("email_id",this.Email_id);
              localStorage.setItem("customer_id",data.insertId);
              console.log(data);
              this.Name="";
              this.Email_id="";
              this.Password="";
              this.Repassword="";
              alert("Added");
              
              window.location.href='tabs/user';
              
            
        });
          
      }
      else 
      {
        alert("Password must be same");
      }
    }
  }
}