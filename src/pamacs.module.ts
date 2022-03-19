import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './endpoints/auth/auth.module';
import { AppController } from './pamacs.controller';
import { AppService } from './pamacs.service';

@Module({
	imports: [
		MongooseModule.forRoot("mongodb://127.0.0.1/Pamacs"),
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
