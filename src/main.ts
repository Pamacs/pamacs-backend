import { NestFactory } from '@nestjs/core';
import Config from 'config';
import { AppModule } from './pamacs.module';

async function bootstrap() {
	const pamacs = await NestFactory.create(AppModule);
	await pamacs.listen(Config.backendPort);
}
bootstrap().catch(() => {
	
});
