import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { SerialService } from './serial/serial.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SerialService, ConfigService],
})
export class AppModule {}
