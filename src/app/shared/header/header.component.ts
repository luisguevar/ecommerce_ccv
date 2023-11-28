import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth-profile/_services/auth.service';
import { CartShopsService } from 'src/app/modules/home/_services/cart-shops.service';
declare var $: any;
declare function initPageEcommerce([]): any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any = null;

  constructor(
    public authSerive: AuthService,
    private router: Router,
    public _cartService: CartShopsService
  ) {

  }




  ngOnInit(): void {
    /*  setTimeout(() => {
       initPageEcommerce($);
     }, 50);
  */
    this.user = this.authSerive.user;
    console.log('user: ', this.user)

    this._cartService.currentDataCart$.subscribe((resp: any) => {
      console.log(resp);
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
