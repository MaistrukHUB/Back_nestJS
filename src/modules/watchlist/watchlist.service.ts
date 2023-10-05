import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { Injectable } from '@nestjs/common';
import { CreateAssetResponse } from './response';

@Injectable()
export class WatchlistService {
    constructor(@InjectModel(Watchlist) private readonly wathlistRepository: typeof Watchlist){}
    
    async createAsset(user, dto): Promise<CreateAssetResponse>{
        try {
            const watchlist = {
                user:user.id,
                name:dto.name,
                assetId:dto.assetId
            }
            await this.wathlistRepository.create(watchlist)
            return watchlist
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteAsset(userId:number, assetId:string):Promise<boolean>{
    try {
        await this.wathlistRepository.destroy({where:{
            id:assetId,
            user:userId
        }})
        return true
    } catch (error) {
        throw new Error(error)
    }
    }
}
