import { Injectable } from '@nestjs/common';
import { ClientDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  private readonly clients: ClientDto[] = [
    new ClientDto('Келик', 'Иван', 'Владимирович', new Date(1991, 2, 18), 1),
    new ClientDto('Келик', 'Анна', 'Александровна', new Date(1997, 3, 27), 2)
   ]

  addClient(newClient: CreateClientDto) {
    this.clients.push(new ClientDto(newClient.lastName, newClient.firstName, newClient.patronymic, newClient.dob))
  }

  getAllClients(): ClientDto[] {
    return this.clients
  }
}
