import { PasswordContainerSchema } from '@/model/PasswordContainer';
import { PasswordEntrySchema } from '@/model/PasswordEntry';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';

@Module({
	imports: [
		MongooseModule.forFeature(
            [
                { name: "containers", schema: PasswordContainerSchema },
				{ name: "passwords", schema: PasswordEntrySchema }
            ]
        ),
	],
	controllers: [PasswordsController],
	providers: [PasswordsService]
})
export class PasswordsModule {}
