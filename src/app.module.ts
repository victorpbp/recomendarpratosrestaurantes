import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
@Module({
  //imports: [RestaurantModule, MongooseModule.forRoot(env.database_url)],
  imports: [RestaurantModule, MongooseModule.forRoot(env.database_url)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
