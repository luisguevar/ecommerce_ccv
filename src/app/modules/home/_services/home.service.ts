import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth-profile/_services/auth.service';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    public router: Router,) {

  }


  getHome() {
    let URL = URL_SERVICIOS + "/ecommerce/home";
    return this.http.get(URL);
  }
}
