import { Controller, Get, Query, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, HttpException, UseFilters  } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('clients')
@ApiExcludeController()
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  async addClient(@Body() createClientDto: CreateClientDto) {
    this.clientsService.addClient(createClientDto)
  }

  @Get()
  async getClients(@Param() searchText: string): Promise<ClientDto[]> {
    return this.clientsService.getAllClients()
  }

  @Get(':id')
  async getClientById(@Param('id') id: string) {
    //throw new HttpException('Client not found.', HttpStatus.NOT_FOUND)
    //throw new HttpException({ error: 'Client not found.', title: 'Clients exceptions'}, HttpStatus.NOT_FOUND)
    return `Клиент с идентификатором ${id}`
  }

  @Put(':id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: ClientDto) {
    return `Обновленный клиент с идентификатором ${id}`
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeClient(@Param('id') id: string) {
    return `Удаленный клиент с идентификатором ${id}`
  }
}
