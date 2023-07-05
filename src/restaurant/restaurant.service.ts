import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { UpdateMenuItemDto } from './dto/update-menuitem.dto';
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
    const restaurant = await this.restaurantModel.find({}).exec();

    return restaurant;
  }

  async findOne(id: string) {
    const restaurant = await this.restaurantModel.findOne({ _id: id }).exec();

    return restaurant;
  }

  async updateRestaurant(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.restaurantModel
      .findOne({ _id: id })
      .exec();

    if (!restaurant) throw new Error('Restaurant not found');

    const name = updateRestaurantDto.name;
    const cnpj = updateRestaurantDto.cnpj;

    restaurant.menu.forEach((menuItem) => {
      if (updateRestaurantDto.menu.map((x) => x.name).includes(menuItem.name))
        throw new Error(`Menu item ${menuItem.name} already exists`);
    });

    let menuItems: MenuItem[] = updateRestaurantDto.menu.map((item) => {
      const menuItem: MenuItem = {
        id: uuidv4(),
        name: item.name.toLowerCase(),
        ingredients: item.ingredients.map((ing) => ing.toLowerCase()),
        kcal: item.kcal,
        isActive: item.isActive,
      };
      return menuItem;
    });

    restaurant.menu.forEach((menuItem) => { menuItems.push(menuItem) });
    
    const update = await this.restaurantModel.updateOne({ _id: id }, {
      name: name,
      cnpj: cnpj,
      menu: menuItems
    });

    return update;
  }

  async updateMenuItem(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    return this.restaurantModel.updateOne(
      { menu: { $elemMatch: {id: id} } },
      { $set: {
          'menu.$[inner].name': updateMenuItemDto.name,
          'menu.$[inner].ingredients': updateMenuItemDto.ingredients,
          'menu.$[inner].kcal': updateMenuItemDto.kcal,
        }
      },
      { arrayFilters: [ { "inner.id": id } ] }
    );
  }

  remove(id: string) {
    return `This action removes a #${id} restaurant`;
  }

  async activateRestaurant(id: string) {
    const restaurant = await this.restaurantModel.findOne({ _id: id }).exec();

    if (!restaurant) throw new Error('Restaurant not found');

    if (restaurant.isActive) throw new Error('Restaurant already activated');

    const filter = { _id: id };
    const flag = { isActive: true };
    const update = await this.restaurantModel.findOneAndUpdate(filter, flag);

    return update;
  }

  async deactivateRestaurant(id: string) {
    const restaurant = await this.restaurantModel.findOne({ _id: id }).exec();

    if (!restaurant) throw new Error('Restaurant not found');

    if (!restaurant.isActive) throw new Error('Restaurant already deactivated');

    const filter = { _id: id };
    const flag = { isActive: false };
    const update = await this.restaurantModel.findOneAndUpdate(filter, flag);

    return update;
  }

  async activateMenuItem(id: string) {
    const menuItem = await this.restaurantModel
      .findOne({ menu: { $elemMatch: {id: id} } })
      .exec();

    if(!menuItem) throw new Error('Menu item not found');

    const activation = await this.restaurantModel.updateOne(
      { menu: { $elemMatch: {id: id} } },
      { $set: { "menu.$[inner].isActive": true } },
      { arrayFilters: [ { "inner.id": id } ] }
    );

    return activation;
  }

  async deactivateMenuItem(id: string) {
    const menuItem = await this.restaurantModel
      .findOne({ menu: { $elemMatch: {id: id} } })
      .exec();

    if(!menuItem) throw new Error('Menu item not found');
    
    const deactivation = await this.restaurantModel.updateOne(
      { menu: { $elemMatch: {id: id} } },
      { $set: { "menu.$[inner].isActive": false } },
      { arrayFilters: [ { "inner.id": id } ] }
    );

    return deactivation;
  }

  getRecommendation(prompt: {data: string}) {
    const str = prompt.data;
    const keywords = str.split(" ");
    
    if (keywords.includes('sobremesa') || keywords.includes('doce')){
      return 'a6dc602f-e822-42b3-beb2-9bf08d80aee9';
    } else if (keywords.includes('mexicana') || keywords.includes('apimentada')){
      return '3846f011-5081-4a48-a9d0-843a03ba266d';
    } else if (keywords.includes('massa') || keywords.includes('salgada')){
      return '2d89a5c9-677c-437c-a00d-c0d92cd72585';
    }

    return 'Couldnt find a proper dish';
  }
}
