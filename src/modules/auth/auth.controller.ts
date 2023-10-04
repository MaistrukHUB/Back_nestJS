import { Controller ,Post,Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAustGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @ApiTags('API')
    @ApiResponse({status:201, type:CreateUserDTO})
    @HttpCode(201)
    @Post('register')
    register(@Body() dto: CreateUserDTO):Promise<CreateUserDTO>{
        return this.authService.registerUsers(dto)
    }

    @ApiTags('API')
    @ApiResponse({status:200, type:AuthUserResponse})
    @HttpCode(200)
    @Post('login')
    login(@Body() dto: UserLoginDTO):Promise<AuthUserResponse>{
        return this.authService.loginUser(dto)
    }

    @UseGuards(JwtAustGuard)
    @Post('test')
    test(){
        return true
    }
}
