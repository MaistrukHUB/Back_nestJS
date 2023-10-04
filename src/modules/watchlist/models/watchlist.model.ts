import { Column, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/users/models/users.model";

@Table
export class Wotchlist extends Model{
    @Column
    user: User

    @Column
    name:string

    @Column
    assetId:string
}