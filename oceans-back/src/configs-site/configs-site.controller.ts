import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfigsSiteService } from './configs-site.service';
import { CreateConfigsSiteDto } from './dto/create-configs-site.dto';
import { UpdateConfigsSiteDto } from './dto/update-configs-site.dto';

@Controller('configs-site')
export class ConfigsSiteController {
  constructor(private readonly configsSiteService: ConfigsSiteService) {}

  @Post()
  create(@Body() createConfigsSiteDto: CreateConfigsSiteDto) {
    return this.configsSiteService.create(createConfigsSiteDto);
  }

  @Get()
  findAll() {
    return this.configsSiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configsSiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfigsSiteDto: UpdateConfigsSiteDto) {
    return this.configsSiteService.update(+id, updateConfigsSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configsSiteService.remove(+id);
  }
}
