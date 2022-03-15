import { Module } from '@nestjs/common';
import { AppController } from './pamacs.controller';
import { AppService } from './pamacs.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
