import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './entities/restaurant.entity';
import { MenuItem } from './entities/menuItem';
import { v4 as uuidv4 } from 'uuid';
import { formatCNPJ } from './helpers/cnpjFormatter';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    // TODO: posteriormente mudar para extrair a informação a partir do token
    const cnpj = formatCNPJ(createRestaurantDto.cnpj);
    if (cnpj.length != 14) throw new Error('Invalid CNPJ');

    const restaurant = await this.restaurantModel
      .findOne({ cnpj: cnpj })
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
      cnpj: cnpj,
      name: createRestaurantDto.name.toLowerCase(),
      menu: menuItems,
      isActive: true,
    });

    return createdRestaurant.save();
  }

  async findAll() {
    const restaurant = await this.restaurantModel
      .find({})
      .exec();

    return restaurant;
  }

  async findOne(id: string) {
    const restaurant = await this.restaurantModel
      .findOne({ _id: id })
      .exec();
    
    return restaurant;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.restaurantModel
      .findOne({ name: UpdateRestaurantDto.name })
      .exec();

    if (!restaurant) throw new Error('Restaurant not found');

    restaurant.menu.forEach((menuItem) => {
      if (updateRestaurantDto.menu.map((x) => x.name).includes(menuItem.name))
        throw new Error('Menu item already exists. ');
    });

    return `This action updates a #${id} restaurant`;
  }

  remove(id: string) {
    return `This action removes a #${id} restaurant`;
  }

  async activateRestaurant(id: string) {
    const restaurant = await this.restaurantModel
      .findOne({ _id: id })
      .exec();
    
    if(!restaurant) throw new Error('Restaurant not found');

    if(restaurant.isActive) throw new Error('Restaurant already activated');

    const filter = { _id: id };
    const flag = { isActive: true };
    const update = await this.restaurantModel.findOneAndUpdate(filter,flag);

    return update;
  }

  async deactivateRestaurant(id: string) {
    const restaurant = await this.restaurantModel
      .findOne({ _id: id })
      .exec();
    
    if(!restaurant) throw new Error('Restaurant not found');

    if(!restaurant.isActive) throw new Error('Restaurant already deactivated');

    const filter = { _id: id };
    const flag = { isActive: false };
    const update = await this.restaurantModel.findOneAndUpdate(filter,flag);

    return update;
  }

  async activateMenuItem(id: string) {
    return this.restaurantModel.updateOne(
      {
        'menu': {
          '$elemMatch': {
            'id': id,
          }
        }
      },
      {
        $set: {
          "menu.$[inner].isActive": true,
        }
      },
      {
        arrayFilters: [
          {"inner.id": id}
      ]
      }
    );
  }

  async deactivateMenuItem(id: string) {
    return this.restaurantModel.updateOne(
      {
        'menu': {
          '$elemMatch': {
            'id': id,
          }
        }
      },
      {
        $set: {
          "menu.$[inner].isActive": false,
        }
      },
      {
        arrayFilters: [
          {"inner.id": id}
      ]
      }
    );
  }

  getRecommendation(input: string){
    
  }
}
