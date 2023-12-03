import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceAuthComponent } from './ecommerce-auth.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthGuard } from '../auth-profile/_services/auth.guard';

const routes: Routes = [{
  path: '',
  component: EcommerceAuthComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'carrito-de-compra',
      component: ShoppingCartComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceAuthRoutingModule { }
