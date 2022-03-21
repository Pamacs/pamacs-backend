import { Validator } from '@/util/decorators/Validator.decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { loginValidator } from '../auth/auth.validator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ContainersService } from './containers.service';
import { containerCreationAndOperationValidator } from './containers.validator';

@Controller('containers')
export class ContainersController {

    constructor( private readonly containerService: ContainersService ) {}

    @Get('get_containers')
    @UseGuards(JwtAuthGuard)
    async getContainers(@Request() req) {
        return await this.containerService.getContainers(req.user);
    }


    @Post('create_container')
    @UseGuards(JwtAuthGuard)
    @Validator(containerCreationAndOperationValidator)
    async createContainer(@Request() req, @Body() body) {
        return await this.containerService.createContainer(body, req.user);
    }


    @Delete('delete_container/:container_id')
    @UseGuards(JwtAuthGuard)
    async deleteContainer(@Request() req, @Param('container_id') container_id) {
        return await this.containerService.deleteContainer(container_id, req.user);
    }

    // i am having nutella for breakfast
    @Patch('edit_container/:container_id')
    @UseGuards(JwtAuthGuard)
    @Validator(containerCreationAndOperationValidator)
    async editContainer(@Request() req, @Body() body, @Param('container_id') container_id) {
        return await this.containerService.editContainer(body, container_id, req.user);
    }

}
