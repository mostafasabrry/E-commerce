import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { logGuard } from './core/guards/log.guard';

export const routes: Routes = [

     {path:'',redirectTo:'home',pathMatch:'full'},

    {path:'',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((c)=>c.AuthLayoutComponent),canActivate:[logGuard],children:[

       {path:'login',loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent)},
       {path:'register',loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent)},
       {path:'forget',loadComponent:()=>import('./pages/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent)},
    ]},
    {path:'',loadComponent:()=>import('./layouts/main-layout/main-layout.component').then((c)=>c.MainLayoutComponent),canActivate:[authGuard],children:[

        {path:'home',loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent)},
        {path:'cart',loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent)},
        {path:'details/:id',loadComponent:()=>import('./pages/details/details.component').then((c)=>c.DetailsComponent)},
        {path:'products',loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent)},
        {path:'brands',loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent)},
        {path:'wishlist',loadComponent:()=>import('./pages/wishlist/wishlist.component').then((c)=>c.WishlistComponent)},
        {path:'categories',loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent)},
        {path:'checkout/:id',loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent)},
        {path:'allorders',loadComponent:()=>import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent)},
        {path:'**',loadComponent:()=>import('./pages/notfound/notfound.component').then((c)=>c.NotfoundComponent)},
        

     ]},

];
