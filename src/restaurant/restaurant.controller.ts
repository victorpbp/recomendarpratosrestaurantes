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
import { MenuFilters } from '../recomendation/IMenuFilters';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get('recommend')
  getRecommendation(@Body() prompt: MenuFilters) {
    return this.restaurantService.getRecommendation(prompt);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Get(':restaurantId/menuitem/:id')
  findOneMenuItem(@Param('restaurantId') restaurantId: string, @Param('id') id: string) {
    return this.restaurantService.findOneMenuItem(restaurantId, id);
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

  @Patch(':id/activate')
  activateRestaurant(@Param('id') id: string) {
    return this.restaurantService.activateRestaurant(id);
  }

  @Patch(':id/deactivate')
  deactivateRestaurant(@Param('id') id: string) {
    return this.restaurantService.deactivateRestaurant(id);
  }

  @Patch(':restaurantId/activate/menuitem/:id')
  activateMenuItem(@Param('restaurantId') restaurantId: string, @Param('id') id: string) {
    return this.restaurantService.activateMenuItem(restaurantId, id);
  }

  @Patch(':restaurantId/deactivate/menuitem/:id')
  deactivateMenuItem(@Param('restaurantId') restaurantId: string, @Param('id') id: string) {
    return this.restaurantService.deactivateMenuItem(restaurantId, id);
  }

}
