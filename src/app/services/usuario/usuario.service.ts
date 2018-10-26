import { Injectable } from '@angular/core';
// import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable()

export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {

    this.cargarStorage();
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuarios';

    return this.http.post(url, usuario)
      .map((resp: any) => {

        swal('Usuario creado', usuario.usuario, 'success');

        return resp.usuario;
      });
  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    // console.log(url);
    return this.http.put(url, usuario)
      .map( (resp: any) => {

        // this.usuario = resp.usuario;
        const usuarioDB: Usuario = resp.usuario;

        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        swal('Usuario Actualizado', usuario.nombre, 'success');

        return true;

      });
  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.usuario.img;

        swal('Imagen Actualizada', this.usuario.nombre, 'success');

        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(resp => {
        console.log(resp);

      });
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('usuario', usuario.usuario);
    } else {
      localStorage.removeItem('usuario');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
      .map((resp: any) => {
        localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));

        return true;
      });
  }
}
