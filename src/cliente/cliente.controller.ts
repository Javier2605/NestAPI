import {
  Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { ClienteService } from './cliente.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { ApiKeyGuard } from '../common/guards/api-key.guard.js';
import { ParsePositiveIntPipe } from '../common/pipes/parse-positive-int.pipe.js';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() dto: CreateClienteDto) {
    return this.clienteService.create(dto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  update(@Param('id', ParsePositiveIntPipe) id: number, @Body() dto: UpdateClienteDto) {
    return this.clienteService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.clienteService.remove(id);
  }
}
