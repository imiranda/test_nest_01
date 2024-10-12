import { HttpException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from 'src/schemas/Client.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClientsService {

  constructor(@InjectModel(Client.name) private clientModel:Model<Client>) {}

  create(createClientDto: CreateClientDto) {
    const newClient = new this.clientModel(CreateClientDto);
    return newClient.save();
  }

  findAll() {
    return this.clientModel.find();
  }

  async findOne(id: number) {
    const client = await this.clientModel.findById(id).exec();
    if (client) return client;
    return new HttpException('Client not found', 404);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(id, updateClientDto);
  }

  remove(id: number) {
    return this.clientModel.findByIdAndDelete(id);
  }
}
