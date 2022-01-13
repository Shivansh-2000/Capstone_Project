import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from './component/admin/admin-category/admin-category.component';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { AdminProductComponent } from './component/admin/admin-product/admin-product.component';
import { AdminProfileComponent } from './component/admin/admin-profile/admin-profile.component';
import { AdminUserProfileComponent } from './component/admin/admin-user-profile/admin-user-profile.component';
import { AboutComponent } from './component/user/about/about.component';
import { CartComponent } from './component/user/cart/cart.component';
import { ContactComponent } from './component/user/contact/contact.component';
import { HomeComponent } from './component/user/home/home.component';
import { ProductComponent } from './component/user/product/product.component';
import { UserLoginComponent } from './component/user/user-login/user-login.component';
import { UserSignUpComponent } from './component/user/user-sign-up/user-sign-up.component';

const routes: Routes = [

  {path:"",redirectTo: 'home', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'cart',component:CartComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'product',component:ProductComponent},
  {path:'UserLogin',component:UserLoginComponent},
  {path:'UserSignup',component:UserSignUpComponent},


  {path:'adminProduct',component:AdminProductComponent},
  {path:'adminCategory',component:AdminCategoryComponent},
  {path:'adminUserProfile',component:AdminUserProfileComponent},
  {path:'adminProfile',component:AdminProfileComponent},
  {path:'adminLogin',component:AdminLoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
