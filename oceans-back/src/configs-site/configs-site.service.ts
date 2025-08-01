import { Injectable } from '@nestjs/common';
import { CreateConfigsSiteDto } from './dto/create-configs-site.dto';
import { UpdateConfigsSiteDto } from './dto/update-configs-site.dto';

@Injectable()
export class ConfigsSiteService {
  create(createConfigsSiteDto: CreateConfigsSiteDto) {
    return 'This action adds a new configsSite';
  }

  findAll() {
    return `This action returns all configsSite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} configsSite`;
  }

  update(id: number, updateConfigsSiteDto: UpdateConfigsSiteDto) {
    return `This action updates a #${id} configsSite`;
  }

  remove(id: number) {
    return `This action removes a #${id} configsSite`;
  }
}
