import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth-profile/_services/auth.service';
import { CartShopsService } from 'src/app/modules/home/_services/cart-shops.service';
declare var $: any;
declare function HOMEINITTEMPLATE([]): any;
declare function ModalProductDetail(): any;

@Component({
  selector: 'app-c-datail-product',
  templateUrl: './c-datail-product.component.html',
  styleUrls: ['./c-datail-product.component.css']
})
export class CDatailProductComponent implements OnInit {


  @Input() product_selected: any;
  @Input() is_landing: boolean = false;

  constructor(
    public _cartService: CartShopsService,
    public _authService: AuthService) {

  }
  ngOnInit(): void {

    if (this.is_landing) {
      setTimeout(() => {

        ModalProductDetail();

      }, 50);
    }
  }

  quantity: number = 0;

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  addCart(product_selected: any) {
    if (!this._authService.user) {
      alert("NECESITAS LOGUEARTE");
      return;
    }

    let data = {

      user_id: this._authService.user.id,
      product_id: this.product_selected.id,
      cantidad: this.quantity,
      precio_unitario: this.product_selected.price_soles,
      subtotal: this.product_selected.price_soles,
      total: this.product_selected.price_soles * this.quantity
    }
    this._cartService.addCartShop(data).subscribe((resp: any) => {
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
