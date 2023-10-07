import { Component, OnInit } from '@angular/core';
import { HomeService } from '../_services/home.service';
declare var $: any;
declare function HOMEINITTEMPLATE([]): any;
declare function ModalProductDetail(): any;

@Component({
  selector: 'app-home-initial',
  templateUrl: './home-initial.component.html',
  styleUrls: ['./home-initial.component.css']
})
export class HomeInitialComponent implements OnInit {
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

    this.product_selected = null;

    setTimeout(() => {
      this.product_selected = product;
      setTimeout(() => {
        $('.product-large-thumbnail').slick({
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          speed: 800,
          draggable: false,
          asNavFor: '.product-small-thumb'
        });

        $('.product-small-thumb').slick({
          infinite: false,
          slidesToShow: 6,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          focusOnSelect: true,
          vertical: true,
          speed: 800,
          asNavFor: '.product-large-thumbnail',
          responsive: [{
            breakpoint: 992,
            settings: {
              vertical: false,
            }
          },
          {
            breakpoint: 768,
            settings: {
              vertical: false,
              slidesToShow: 4,
            }
          }
          ]

        });

        if ($('.zoom-gallery').length) {
          $('.zoom-gallery').each(function () {
            $('.zoom-gallery').magnificPopup({
              delegate: 'a.popup-zoom',
              type: 'image',
              gallery: {
                enabled: true
              }
            });
          });
        }

        $('.pro-qty').prepend('<span class="dec qtybtn">-</span>');
        $('.pro-qty').append('<span class="inc qtybtn">+</span>');
        $('.qtybtn').on('click', function () {
          var $button = $('.pro-qty');
          var oldValue = $button.parent().find('input').val();
          if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
          } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
              var newVal = parseFloat(oldValue) - 1;
            } else {
              newVal = 0;
            }
          }
          $button.parent().find('input').val(newVal);
        });


      }, 50);
    }, 100);


  }
}
