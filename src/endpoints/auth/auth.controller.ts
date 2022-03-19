import { ApiResponse, ResponseType } from '@/model/ApiResponse';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginValidator, registerValidator } from './auth.validator';
import * as messages from "messages";
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { getIpFromRequest } from '@/util/security/GetIpFromReq';

@Controller('auth')
export class AuthController {

    constructor( private readonly authService: AuthService ) {}

    @Post('register')
    async register(@Body() body): Promise<ApiResponse> {
        let { error } = registerValidator(body);
        if ( error ) return new ApiResponse(ResponseType.ERROR, messages.response.validation_error);

        return await this.authService.register(body);
    }

    //TODO: make a decorator for validation beause it's hot
    @Post('login')
    async login(@Request() req, @Body() body): Promise<ApiResponse> {
        let { error } = loginValidator(body);
        if ( error ) return new ApiResponse(ResponseType.ERROR, messages.response.validation_error);

        let ip = getIpFromRequest(req);
        return await this.authService.login(body, ip);
    }

    @Get('r')
    @UseGuards(JwtAuthGuard)
    async returnSignedUser(@Request() req) {
        return req.user;
    }

}
