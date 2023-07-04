import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { UpdateMenuItemDto } from './dto/update-menuitem.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.updateRestaurant(id, updateRestaurantDto);
  }

  @Patch('menuitem/:id')
  updateMenuItem(@Param('id') id: string, @Body() updateMenuItemDto: UpdateMenuItemDto) {
    return this.restaurantService.updateMenuItem(id, updateMenuItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }

  @Patch('activate/:id')
  activateRestaurant(@Param('id') id: string) {
    return this.restaurantService.activateRestaurant(id);
  }

  @Patch('deactivate/:id')
  deactivateRestaurant(@Param('id') id: string) {
    return this.restaurantService.deactivateRestaurant(id);
  }

  @Patch('activate/menuitem/:id')
  activateMenuItem(@Param('id') id: string) {
    return this.restaurantService.activateMenuItem(id);
  }

  @Patch('deactivate/menuitem/:id')
  deactivateMenuItem(@Param('id') id: string) {
    return this.restaurantService.deactivateMenuItem(id);
  }

  @Get('recommend')
  getRecommendation(@Body() input: string) {
    return this.restaurantService.getRecommendation(input);
  }
}
