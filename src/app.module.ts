import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
@Module({
  imports: [RestaurantModule, MongooseModule.forRoot('mongodb+srv://food:JzVsqO9yb7xIRRZh@food.k0jbd4w.mongodb.net/?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
