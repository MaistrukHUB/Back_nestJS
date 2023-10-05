import { Injectable,BadRequestException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User){}

    async hashPassword(password: string):Promise<string>{
        try {
            return bcrypt.hash(password, 10)
        } catch (error) {
            throw new Error(error)
        }
    }

    async findUserByEmail(email:string):Promise<User>{
        try {
            return this.userRepository.findOne({where:{email}, include:{
                model:Watchlist,
                required:false
            }})
        } catch (error) {
            throw new Error(error)
        }
    }

    async createUser(dto:CreateUserDTO): Promise<CreateUserDTO>{
        try {
            dto.password = await this.hashPassword(dto.password)
            await this.userRepository.create({
                firstName:dto.firstName,
                userName:dto.userName,
                email:dto.email,
                password:dto.password
            })
            return dto
        } catch (error) {
            throw new Error(error)
        }
    }

    async publicUser(email:string):Promise<User>{
        try {
        return this.userRepository.findOne({
            where: {email},
            attributes: {exclude: ['password']},
            include: {
                model: Watchlist,
                required: false
            }
            })
        } catch (error) {
        throw new Error(error)
        }
    }

    async updateUser(email:string, dto:UpdateUserDTO):Promise<UpdateUserDTO>{
        try {
            await this.userRepository.update(dto, {where:{email}})
        return dto
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteUser(email:string):Promise<boolean>{
        try {
            await this.userRepository.destroy({where:{email}})
        return true
        } catch (error) {
            throw new Error(error)
        }
    }
} 
