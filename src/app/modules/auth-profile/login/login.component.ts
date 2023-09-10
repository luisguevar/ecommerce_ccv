import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any = null;
  password: any = null;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {

  }
  ngOnInit(): void {

  }

  login() {
    if (!this.email || !this.password) {
      alert("NECESITAS COLOCAR EMAIL O CONTRASEÑA")
      return;
    }
    this.authService.login(this.email, this.password).subscribe(async (resp: any) => {
      console.log('respuesta: ', resp);

      if (!resp.error && resp) {
        //SE EJECEUTÓ CORRECTAMENTE Y VOLVER AL HOME CON USUARIO AUTH

        await this.router.navigate(["/"]);
        document.location.reload();
      } else {
        if (resp.error.error == 'Unauthorized') {
          alert('CREDENCIALES INCORRECTAS');
          return;
        }
      }
    })
  }

}
