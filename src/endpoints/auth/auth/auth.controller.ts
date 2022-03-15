import { ApiResponse } from '@/model/ApiResponse';
import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post('register')
    async register(): Promise<ApiResponse> {
        return null;
    }

    @Post('login')
    async login(): Promise<ApiResponse> {
        return null;
    }

}
