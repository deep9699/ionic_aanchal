import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserAuthguardService } from './user-authguard.service';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'category', loadChildren: './category/category.module#CategoryPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'product-details/:id', loadChildren: './product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'log-in', loadChildren: './log-in/log-in.module#LogInPageModule' },
  { path: 'check-out', loadChildren: './check-out/check-out.module#CheckOutPageModule' },
  { path: 'past-order', loadChildren: './past-order/past-order.module#PastOrderPageModule' },
  { path: 'manage-profile', loadChildren: './manage-profile/manage-profile.module#ManageProfilePageModule' },
  { path: 'manage-address', loadChildren: './manage-address/manage-address.module#ManageAddressPageModule' },
  { path: 'customer-support', loadChildren: './customer-support/customer-support.module#CustomerSupportPageModule' },
  { path: 'about-us', loadChildren: './about-us/about-us.module#AboutUsPageModule' },
  { path: 'forget-password', loadChildren: './forget-password/forget-password.module#ForgetPasswordPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
