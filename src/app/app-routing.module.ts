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
import { AddproductComponent } from './addproduct/addproduct.component';
import { ShowproductComponent } from './showproduct/showproduct.component';
import { FarmerProductBidDetailsComponent } from './farmer-product-bid-details/farmer-product-bid-details.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget_password', component: ForgetpassComponent },
  {
    path: 'farmer_home', component: FarmerHomeComponent,
    children: [
      { path: '', component: AddproductComponent },
      { path: 'showproduct', component: ShowproductComponent },
      { path: 'farmerProductBidDetails', component: FarmerProductBidDetailsComponent }
    ],
  },

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
