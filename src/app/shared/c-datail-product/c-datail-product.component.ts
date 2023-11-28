import { Component, Input, OnInit } from '@angular/core';
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

  constructor(public _cartService: CartShopsService) {

  }
  ngOnInit(): void {

    if (this.is_landing) {
      setTimeout(() => {

        ModalProductDetail();

      }, 50);
    }
  }

  addCart(product_selected: any) {
    this._cartService.changeCart(product_selected);
  }
}
