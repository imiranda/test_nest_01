import { HttpException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from 'src/schemas/Client.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class ClientsService {

  constructor(@InjectModel(Client.name) private clientModel:Model<Client>) {}

  async create(createClientDto: CreateClientDto) {
    const saltOrRounds = 10;
    createClientDto.password = await bcrypt.hash(createClientDto.password, saltOrRounds);
    const newClient = new this.clientModel(createClientDto);
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

  async update(id: number, updateClientDto: UpdateClientDto) {
    if (updateClientDto.password) {
      const saltOrRounds = 10;
      updateClientDto.password = await bcrypt.hash(updateClientDto.password, saltOrRounds);
    }
    return this.clientModel.findByIdAndUpdate(id, updateClientDto);
  }

  remove(id: number) {
    return this.clientModel.findByIdAndDelete(id);
  }
}
