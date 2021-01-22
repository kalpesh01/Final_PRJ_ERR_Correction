import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerHomeComponent } from './buyer-home/buyer-home.component';
import { FarmerHomeComponent } from './farmer-home/farmer-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { ProductsGalleryComponent } from './products-gallery copy/products-gallery.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'farmer_home', component: FarmerHomeComponent },
  { path: 'forget_password', component: ForgetpassComponent },
  {
    path: 'buyer_home',
    component: BuyerHomeComponent,

    children: [
      { path: '', component: ProductsGalleryComponent },
      { path: 'productBidDetails', component: ProductDetailsComponent },
    ],
  },
  { path: 'admin_home', component: AdminHomeComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
