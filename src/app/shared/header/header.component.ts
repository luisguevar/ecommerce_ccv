import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth-profile/_services/auth.service';
import { CartShopsService } from 'src/app/modules/home/_services/cart-shops.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any = null;
  listCart: any = [];
  total: any = 0;
  constructor(
    public authSerive: AuthService,
    private router: Router,
    public _cartService: CartShopsService
  ) {

  }




  ngOnInit(): void {

    this.user = this.authSerive.user;
    //console.log('user: ', this.user)
    this._cartService.listCartShop().subscribe((resp: any) => {
      //console.log(resp);

      resp.carts.data.forEach((element: any) => {
        this._cartService.changeCart(element)
      });
      this.listCart = resp.carts.data;
    });
    this._cartService.currentDataCart$.subscribe((resp: any) => {
      //console.log(resp);
      this.listCart = resp;
      this.total = this.listCart.reduce((sum: any, item: any) => sum = item.product.price_soles, 0);
    });
  }


  async logout() {
    this.authSerive.logout();
    await this.router.navigate(["/"]);
    document.location.reload();
  }

  isHome() {
    return this.router.url == "" || this.router.url == "/" ? true : false;
  }
}
