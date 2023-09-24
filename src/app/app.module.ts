import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config/dist';
import configuration from '../configurations'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load:[configuration]
  }),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
