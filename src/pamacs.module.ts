import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './endpoints/auth/auth.module';
import { ContainersModule } from './endpoints/containers/containers.module';
import { AppController } from './pamacs.controller';
import { AppService } from './pamacs.service';
import { ValidationGuard } from './util/security/guards/Validation.guard';

@Module({
	imports: [
		MongooseModule.forRoot("mongodb://127.0.0.1/Pamacs"),
		AuthModule,
		ContainersModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ValidationGuard
		}
	],
})
export class AppModule {}
