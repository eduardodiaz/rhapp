import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  usuario: string;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();

    // this.usuario = localStorage.getItem('usuario') || '';
  }

  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario( null, forma.value.noEmpleado, forma.value.usuario, forma.value.password );

    this._usuarioService.login( usuario, forma.value.recuerdame)
      .subscribe( correcto => this.router.navigate(['/dashboard']));

    // this.router.navigate(['/dashboard']);
  }
}
