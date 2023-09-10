import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: any = null;
  surname: any = null;
  email: any = null;
  password: any = null;
  r_password: any = null;

  constructor(

    public authService: AuthService,
    public router: Router
  ) {

  }
  ngOnInit(): void {

  }

  register() {

    if (!this.name || !this.surname || !this.email || !this.password || !this.r_password) {
      alert("NECESITAS DIGITAR TODOS LOS CAMPOS PARA EL REGISTRO")
      return;
    }

    if (this.password != this.r_password) {
      alert("LAS CONSTRASEÑAS SON DISTINTAS")
      return;
    }

    let data = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      r_password: this.r_password,
    }
    this.authService.register(data).subscribe((resp: any) => {
      console.log(resp);
      this.router.navigate(['auth/login'])
    });
  }
}
