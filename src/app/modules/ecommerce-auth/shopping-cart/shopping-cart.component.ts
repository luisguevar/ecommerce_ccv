import { Component, OnInit } from '@angular/core';
import { CartShopsService } from '../../home/_services/cart-shops.service';
declare var $: any;
declare function HOMEINITTEMPLATE([]): any;

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  listCart: any = [];
  total: any = 0;
  convertDolar: any = 3.8; //valor por def si el api falla
  constructor(

    public _cartService: CartShopsService
  ) {

  }
  ngOnInit(): void {
    setTimeout(() => {
      console.log('CARGA DE QUERY');
      HOMEINITTEMPLATE($);

    }, 50);

    this._cartService.ToDolar().subscribe((resp: any) => {
      console.log('To Dolar: ', resp);
      this.convertDolar = resp.Cotizacion[0].Venta;
      console.log('convertDolar:', this.convertDolar);
      
    })

    this._cartService.currentDataCart$.subscribe((resp: any) => {
      this.listCart = resp;
      this.total = this.listCart.reduce((sum: any, item: any) => sum + item.total, 0);
      /* console.log('total: ', this.total); */
    })

  }

  deleteItem(cart: any) {
    this._cartService.deleteCartShop(cart.id).subscribe();
    this._cartService.removeItemCart(cart);
  }

  quantity: number = 0;

  increase(cart: any) {
    cart.cantidad++;

    /*  let data = {
       cantidad: cart.cantidad,
       total: cart.subtotal * cart.cantidad,
     }; */
    cart.total = cart.subtotal * cart.cantidad
    this._cartService.updateCartShop(cart.id, cart).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alert(resp.message_text);
        return;
      } else {
        this._cartService.changeCart(resp.cart_shop);
      }
    })
  }

  decrease(cart: any) {
    if (cart.cantidad > 1) {
      cart.cantidad--;
    }
    /* 
        let data = {
          cantidad: cart.cantidad,
          total: cart.subtotal * cart.cantidad,
        }; */

    cart.total = cart.subtotal * cart.cantidad

    this._cartService.updateCartShop(cart.id, cart).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alert(resp.message_text);
        return;
      } else {
        this._cartService.changeCart(resp.cart_shop);
      }
    })
  }

}
