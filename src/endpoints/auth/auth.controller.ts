import { ApiResponse, ResponseType } from '@/model/ApiResponse';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginValidator, registerValidator } from './auth.validator';
import * as messages from "messages";
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { getIpFromRequest } from '@/util/security/GetIpFromReq';
import { Validator } from '@/util/decorators/Validator.decorator';

@Controller('auth')
export class AuthController {

    constructor( private readonly authService: AuthService ) {}

    @Post('register')
    @Validator(registerValidator)
    async register(@Body() body): Promise<ApiResponse> {

        return await this.authService.register(body);
    }

    //TODO: make a decorator for validation beause it's hot
    // already done and it looks so amazing >w<
    @Post('login')
    @Validator(loginValidator)
    async login(@Request() req, @Body() body): Promise<ApiResponse> {

        let ip = getIpFromRequest(req);
        return await this.authService.login(body, ip);
    }

    /*@Get('debug/return_signed_user')
    @UseGuards(JwtAuthGuard)
    async returnSignedUser(@Request() req) {
        return req.user;
    }*/

}
