import { Validator } from '@/util/decorators/Validator.decorator';
import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { PasswordsService } from './passwords.service';
import { passwordAddValidator } from './passwords.validator';

@Controller('passwords')
export class PasswordsController {

    constructor( private readonly passwordService: PasswordsService ) {}

    @Get('get_passwords/:container_id')
    @UseGuards(JwtAuthGuard)
    async getPasswords(@Request() req, @Param('container_id') container_id) {
        return await this.passwordService.getPasswords(container_id, req.user);
    }

    @Post('add_passwords/:container_id')
    @UseGuards(JwtAuthGuard)
    @Validator(passwordAddValidator)
    async addPasswords(@Request() req, @Body() body, @Param('container_id') container_id) {
        return await this.passwordService.addPasswords(body, container_id, req.user);
    }

    @Patch('edit_password/:password_id')
    @UseGuards(JwtAuthGuard)
    @Validator(passwordAddValidator)
    async editPasswords(@Request() req, @Body() body, @Param('password_id') password_id) {
        return await this.passwordService.editPassword(body, password_id, req.user);
    }


}
