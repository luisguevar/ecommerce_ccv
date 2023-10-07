import { Component, OnInit } from '@angular/core';
import { HomeService } from './_services/home.service';

declare var $: any;
declare function HOMEINITTEMPLATE([]): any;
declare function ModalProductDetail(): any;

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



  constructor(
    public _homeService: HomeService
  ) {

  }
  ngOnInit(): void {


  }


}
