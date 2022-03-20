import { Module } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { ContainersController } from './containers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordContainerSchema } from '@/model/PasswordContainer';

@Module({
	imports: [
		MongooseModule.forFeature(
            [
                { name: "containers", schema: PasswordContainerSchema }
            ]
        ),
	],
	providers: [ContainersService],
	controllers: [ContainersController]
})
export class ContainersModule {}
