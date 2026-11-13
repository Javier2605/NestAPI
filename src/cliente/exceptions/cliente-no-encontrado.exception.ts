import { NotFoundException } from '@nestjs/common';

export class ClienteNoEncontradoException extends NotFoundException {
  constructor(id: number) {
    super(`Cliente con id ${id} no encontrado`);
  }
}