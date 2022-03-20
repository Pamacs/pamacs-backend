import { NestFactory } from '@nestjs/core';
import Config from '@/config';
import { AppModule } from './pamacs.module';
import Logger from './util/Logger';
import 'dotenv/config';
import { ValidationErrorFilter } from './util/exceptions/filters/ValidationError.filter';

async function bootstrap() {
	Logger.info("Starting backend");

	const pamacs = await NestFactory.create(AppModule);

	pamacs.useGlobalFilters(new ValidationErrorFilter());

	await pamacs.listen(Config.backendPort);
}
bootstrap().catch((e) => {
	Logger.error(e)
});
