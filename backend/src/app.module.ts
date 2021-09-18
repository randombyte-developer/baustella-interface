import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerialService } from './serial/serial.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SerialService],
})
export class AppModule {}
