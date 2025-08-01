import { Module } from '@nestjs/common';
import { ConfigsSiteService } from './configs-site.service';
import { ConfigsSiteController } from './configs-site.controller';

@Module({
  controllers: [ConfigsSiteController],
  providers: [ConfigsSiteService],
})
export class ConfigsSiteModule {}
