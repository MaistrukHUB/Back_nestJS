import { Body, Controller, Delete, Patch, Req, UseGuards  } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto';
import { JwtAustGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';



@Controller('users')
export class UserController {
    constructor(private readonly userService:UsersService){}

    @ApiTags('Api')
    @ApiResponse({status:200,type: UpdateUserDTO})
    @UseGuards(JwtAustGuard)
    @Patch()
    updateUser(@Body() updateDto:UpdateUserDTO,@Req() request):Promise<UpdateUserDTO>{
        const user = request.user
        return this.userService.updateUser(user.email, updateDto)
    }

    @UseGuards(JwtAustGuard)
    @Delete()
    deleteUser(@Req() request){
        const user = request.user
        return this.userService.deleteUser(user.email)
    }
} 
