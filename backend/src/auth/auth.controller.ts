import { Body, Controller, Get, HttpStatus, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { IUserService } from 'src/users/interfaces/user';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';

@Controller(Routes.AUTH)
export class AuthController {
    constructor(@Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService) { }
    
    @Post('register') 
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return instanceToPlain(await this.userService.createUser(createUserDto))
    }
    
    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Res() res: Response) {
        return res.send(HttpStatus.OK)
    }
    
    @Get('status')
    @UseGuards(AuthenticatedGuard)
    async status(@Req() req: Request, @Res() res: Response) {
        res.send(req.user);
    }
    
    @Post('logout')
    logout() {
    
    }
}
