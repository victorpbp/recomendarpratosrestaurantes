import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [RestaurantModule, MongooseModule.forRoot(process.env.DATABASE_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
