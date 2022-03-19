import { NestFactory } from '@nestjs/core';
import Config from '@/config';
import { AppModule } from './pamacs.module';
import Logger from './util/Logger';
import 'dotenv/config';

async function bootstrap() {
	Logger.info("Starting backend");

	const pamacs = await NestFactory.create(AppModule);

	await pamacs.listen(Config.backendPort);
}
bootstrap().catch((e) => {
	Logger.error(e)
});
