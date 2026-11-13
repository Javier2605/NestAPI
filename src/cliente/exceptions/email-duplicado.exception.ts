import { ConflictException } from '@nestjs/common';

export class EmailDuplicadoException extends ConflictException {
  constructor(email: string) {
    super(`Ya existe un cliente con el email ${email}`);
  }
}