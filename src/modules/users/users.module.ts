import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';

@Module({
  imports:[SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
