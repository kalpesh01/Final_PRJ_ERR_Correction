import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from './login/login.component';

import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { FarmerHomeComponent } from './farmer-home/farmer-home.component';
import { BuyerHomeComponent } from './buyer-home/buyer-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ProductsGalleryComponent } from './products-gallery copy/products-gallery.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutModalComponent,
    FarmerHomeComponent,
    BuyerHomeComponent,
    AdminHomeComponent,
    ProductsGalleryComponent,
    ProductDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
