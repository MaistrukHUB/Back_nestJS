import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { Injectable } from '@nestjs/common';
import { CreateAssetResponse } from './response';

@Injectable()
export class WatchlistService {
    constructor(@InjectModel(Watchlist) private readonly wathlistRepository: typeof Watchlist){}
    
    async createAsset(user, dto): Promise<CreateAssetResponse>{
        const watchlist = {
            user:user.id,
            name:dto.name,
            assetId:dto.assetId
        }
        await this.wathlistRepository.create(watchlist)
        return watchlist
    }
    async deleteAsset(userId:number, assetId:string):Promise<boolean>{
        await this.wathlistRepository.destroy({where:{
            id:assetId,
            user:userId
        }})
        return true
    }
}
