import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { faker } from '@faker-js/faker';
import { FormControl } from '@angular/forms';

export interface Producto {
  codigo: string;
  nombre: string;
  precio: string;
  descripcion: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public producto: Producto = {
    codigo: 'COD001',
    nombre: 'Muebles',
    precio: '2100000',
    descripcion: 'Estas son las caracteristicas del mueble'
  };

  codigoDispositivo = new FormControl('');

  constructor(private _socket: Socket) { }

  ngOnInit(): void {
    this.getMessage();
  }

  cambiarInfo() {
    const producto: Producto = {
      codigo: '',
      nombre: faker.commerce.productName(),
      precio: faker.commerce.price(0, 1000000, 2, '$'),
      descripcion: faker.lorem.sentences(),
    };
    this.sendMessage(producto);
  }

  sendMessage(msg: any) {
    this._socket.emit('message', msg);
  }

  getMessage() {
    this._socket.on('message', (response: any) => {
      const codigo = this.codigoDispositivo.value;
      if (response.codigo === codigo) {
        this.producto = {
          codigo: response.codigo,
          nombre: response.nombre,
          precio: response.precio,
          descripcion: response.descripcion
        };
      }
    });
  }

}
