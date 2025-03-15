import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

export const appRoutes: Routes = [
  { path: '', component: ProductListComponent },  // Default Welcome Page
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },  // View Product
  { path: 'product/:id/edit', component: ProductEditComponent }, // Edit Product
  { path: 'add-product', component: ProductAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent }
];
