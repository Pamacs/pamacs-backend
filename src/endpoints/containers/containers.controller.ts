import { Validator } from '@/util/decorators/Validator.decorator';
import { Controller, Post } from '@nestjs/common';
import { loginValidator } from '../auth/auth.validator';

@Controller('containers')
export class ContainersController {

    @Post('create_container')
    @Validator(loginValidator)
    async createContainer() {
        console.log('balls')
    }

}
