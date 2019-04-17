import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CustomerService } from '../customer.service';
import { AlertController } from '@ionic/angular';
import { email } from '../classes/email_class';


export class login_customer {
  constructor(public Email_id: string, public Password: string) {}
}

@Component({
  
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(private formBuilder: FormBuilder,private alertController:AlertController,private _router:Router,private cust_ser:CustomerService,private _actroute:ActivatedRoute) { }
 

  registerForm: FormGroup;
  submitted = false;

  code:number;
  Email_id: string;
  Password: string;
  pass_flag:boolean=true;
  path:string='';

   onclickBack()
  {
    this._router.navigate(['tabs/user']);
  }  
  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],

    });


  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Forget password',
      inputs: [
        {
          name: 'Email_id',
          type: 'text',
          id:'email_id',
          placeholder: 'Enter Your Email Id',
          value:'',
        },
      ],
      buttons:[ 
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
        text: 'Send Code',
        handler: data => {
          if(typeof data.Email_id!=null)
          {
            this.Email_id=data.Email_id;
            console.log(this.Email_id);
            this.onclickForgetPassword();
          }
          console.log('Confirm Ok');
        }
      }]
      });
      await alert.present();
    }
  onclickForgetPassword()
  {
  this.cust_ser.Cusrtomer_login(this.Email_id).subscribe(
    (data:any[])=>
    {
      if(data.length==0)
      {
        alert("invalid email_id");
      }
      else
      {
        this.Password=data[0].Password;
        this.code=(Math.floor(Math.random()*1000)+9000);
        localStorage.setItem('code',this.code.toString());
        localStorage.setItem('Email_id',this.Email_id);
        this.cust_ser.sentMail(new email(this.Email_id,"AANCHAL Forget Password","Your Code for Change Password is : "+this.code)).subscribe(
        (data:any[])=>
        {
          console.log(data);
          console.log(localStorage.getItem('code'));
        }
        );
        console.log(localStorage.getItem('code'));
        this._router.navigate(['forget-password']);

      }
    }
  );
 }

 onPass_flag()
 {
   this.pass_flag=!this.pass_flag;
 }

 reload()
 {
  window.location.href=this.path;
  console.log(this.path);

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
      this.cust_ser.log_in_customer(new login_customer(this.Email_id,this.Password)).subscribe(
        (data:any)=>
        {
          console.log(data);
          if(data.length==1)
          {
            console.log(data.Customer_id);
               this.Email_id=data[0].Email_id;
              localStorage.setItem('email_id',this.Email_id);
              localStorage.setItem('customer_id',data[0].Customer_id);
              alert('Success');
              this._router.navigate(['']);
            this.path=this.cust_ser.redirect_url;
            this.reload();

          }
          else
          {
            alert('Email_id or Password Incorrect');
          }

        }
      )

      console.log(this.Email_id);
      console.log(this.Password);
    }
  }

}
  
