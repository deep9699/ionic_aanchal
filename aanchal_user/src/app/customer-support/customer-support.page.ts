import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.page.html',
  styleUrls: ['./customer-support.page.scss'],
})
export class CustomerSupportPage implements OnInit {

  constructor(private _router:Router) { }
  onclickBack()
  {
    this._router.navigate(['tabs/user']);
  }
  ngOnInit() {
  }

}
