import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ForgetPasswordPage } from './forget-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetPasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatFormFieldModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgetPasswordPage]
})
export class ForgetPasswordPageModule {}