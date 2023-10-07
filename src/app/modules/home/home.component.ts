import { Component, OnInit } from '@angular/core';
import { HomeService } from './_services/home.service';

declare var $: any;
declare function HOMEINITTEMPLATE([]): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sliders: any = [];
  categories: any = [];
  products_random_a: any = [];
  products_random_b: any = [];
  products_random_c: any = [];
  products_random_d: any = [];
  products_random_e: any = [];

  product_selected: any = [];

  datas: any[] = [
    {
      nombre: 'luis',
      appelido: 'guevara'
    },
    {
      nombre: 'Maria',
      appelido: 'Lopez'
    },
    {
      nombre: 'Juan',
      appelido: 'Perez'
    }
  ];

  constructor(
    public _homeService: HomeService
  ) {

  }
  ngOnInit(): void {

    this._homeService.getHome().subscribe((resp: any) => {

      this.sliders = resp.sliders;
      this.categories = resp.categories;
      this.products_random_a = resp.products_random_a;
      this.products_random_b = resp.products_random_b;
      this.products_random_c = resp.products_random_c;
      this.products_random_d = resp.products_random_d;
      this.products_random_e = resp.products_random_d;

      setTimeout(() => {
        console.log('CARGA DE QUERY');
        HOMEINITTEMPLATE($);

      }, 50);



      console.log('CARGA DE DATOS');
      console.log('DATA', resp);

    });
  }

  openModal(product: any) {


    console.log('Hola: ', product)
    this.product_selected = product;


  }
}
