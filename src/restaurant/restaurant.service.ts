import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './entities/restaurant.entity';
import { MenuItem } from './entities/menuItem';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    // TODO: posteriormente mudar para extrair a informação a partir do token
    const restaurant = await this.restaurantModel
      .findOne({ name: createRestaurantDto.name.toLowerCase() })
      .exec();

    if (restaurant) throw new Error('Restaurant already exists');

    const menuItems: MenuItem[] = createRestaurantDto.menu.map((item) => {
      const menuItem: MenuItem = {
        id: uuidv4(),
        name: item.name.toLowerCase(),
        ingredients: item.ingredients.map((ing) => ing.toLowerCase()),
        kcal: item.kcal,
        isActive: item.isActive,
      };
      return menuItem;
    });

    const createdRestaurant = new this.restaurantModel({
      id: uuidv4(),
      name: createRestaurantDto.name.toLowerCase(),
      menu: menuItems,
      isActive: true,
    });

    return createdRestaurant.save();
  }

  findAll() {
    return `This action returns all restaurant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    // SNIPPET PARA AJUDAR NA ATUALIZAÇÃO

    // const restaurant = await this.restaurantModel
    //   .findOne({ name: createRestaurantDto.name })
    //   .exec();

    // if (!restaurant) throw new Error('Restaurant not found');

    // restaurant.menu.forEach((menuItem) => {
    //   if (createRestaurantDto.menu.map((x) => x.name).includes(menuItem.name))
    //     throw new Error('Menu item already exists. ');
    // });

    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
