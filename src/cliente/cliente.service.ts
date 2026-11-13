import { Injectable } from '@nestjs/common';
import { Cliente } from './entities/cliente.entity.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { ClienteNoEncontradoException } from './exceptions/cliente-no-encontrado.exception.js';
import { EmailDuplicadoException } from './exceptions/email-duplicado.exception.js';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];
  private siguienteId = 1;

  create(dto: CreateClienteDto): Cliente {
    this.validarEmailUnico(dto.email);
    const cliente: Cliente = { id: this.siguienteId++, ...dto };
    this.clientes.push(cliente);
    return cliente;
  }

  findAll(): Cliente[] {
    return this.clientes;
  }

  findOne(id: number): Cliente {
    const cliente = this.clientes.find((c) => c.id === id);
    if (!cliente) throw new ClienteNoEncontradoException(id);
    return cliente;
  }

  update(id: number, dto: UpdateClienteDto): Cliente {
    const cliente = this.findOne(id);
    if (dto.email && dto.email !== cliente.email) {
      this.validarEmailUnico(dto.email);
    }
    Object.assign(cliente, dto);
    return cliente;
  }

  remove(id: number) {
    const cliente = this.findOne(id);
    this.clientes = this.clientes.filter((c) => c.id !== cliente.id);
    return { mensaje: `Cliente ${id} eliminado` };
  }

  private validarEmailUnico(email: string) {
    if (this.clientes.some((c) => c.email === email)) {
      throw new EmailDuplicadoException(email);
    }
  }
}