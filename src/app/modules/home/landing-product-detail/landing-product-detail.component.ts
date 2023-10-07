import { Component, OnInit } from '@angular/core';
import { HomeService } from '../_services/home.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
declare function HOMEINITTEMPLATE([]): any;
@Component({
  selector: 'app-landing-product-detail',
  templateUrl: './landing-product-detail.component.html',
  styleUrls: ['./landing-product-detail.component.css']
})
export class LandingProductDetailComponent implements OnInit {
  product_selected: any = null;
  product_relateds: any = [];
  slug_product: any = null;

  constructor(
    public _homeService: HomeService,
    public router: Router,
    public activerouter: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    setTimeout(() => {
      console.log('CARGA DE QUERY');
      HOMEINITTEMPLATE($);

    }, 50);

    this.activerouter.params.subscribe((resp: any) => {
      this.slug_product = resp["slug"] || "";
    })
    this._homeService.detailProduct(this.slug_product).subscribe((resp: any) => {
      console.log('resp: ', resp);
      if (resp.message == 403) {
        this.router.navigateByUrl("/");
      } else {
        this.product_selected = resp.product_detail;
        this.product_relateds = resp.product_relateds;

        setTimeout(() => {
          $('.recent-product-activation').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            dots: false,
            prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
            nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
            responsive: [{
              breakpoint: 1199,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 479,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            ]
          });
        }, 40);
      }

    });
  }

}
