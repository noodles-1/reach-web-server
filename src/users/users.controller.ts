import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "@/users/users.service";
import { UsersDto } from "@/users/users.dto";
import { AuthGuard } from "@/auth/auth.guard";
import { Request } from "express";

@Controller('/user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * GET REQUESTS
     */
    @Get()
    @UseGuards(AuthGuard)
    async getUser(@Req() request: Request) {
        return await this.usersService.getUser(request['user'].userId);
    }

    @Get('check-email/:email')
    async checkEmail(@Param() params: UsersDto) {
        return await this.usersService.checkEmail(params.email);
    }

    /**
     * POST REQUESTS
     */
    @Post('create-user')
    async createUser(@Body() body: UsersDto) {
        return this.usersService.createUser(body);
    }

    @Post('check-password')
    async checkPassword(@Body() body: UsersDto) {
        return this.usersService.checkPassword(body);
    }
}