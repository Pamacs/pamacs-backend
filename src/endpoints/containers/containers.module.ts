import { Module } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { ContainersController } from './containers.controller';

@Module({
	providers: [ContainersService],
	controllers: [ContainersController]
})
export class ContainersModule {}
