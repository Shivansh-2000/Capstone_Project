import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/user/header/header.component';
import { HomeComponent } from './component/user/home/home.component';
import { ProductComponent } from './component/user/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './component/user/cart/cart.component';
import { ContactComponent } from './component/user/contact/contact.component';
import { AboutComponent } from './component/user/about/about.component';
import { NavBarComponent } from './component/admin/nav-bar/nav-bar.component';
import { AdminProductComponent } from './component/admin/admin-product/admin-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCategoryComponent } from './component/admin/admin-category/admin-category.component';
import { AdminUserProfileComponent } from './component/admin/admin-user-profile/admin-user-profile.component';
import { AdminProfileComponent } from './component/admin/admin-profile/admin-profile.component';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { UserLoginComponent } from './component/user/user-login/user-login.component';
import { FooterComponent } from './component/user/footer/footer.component';
import { UserSignUpComponent } from './component/user/user-sign-up/user-sign-up.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    ContactComponent,
    AboutComponent,
    NavBarComponent,
    AdminProductComponent,
    AdminCategoryComponent,
    AdminUserProfileComponent,
    AdminProfileComponent,
    AdminLoginComponent,
    UserLoginComponent,
    FooterComponent,
    UserSignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
