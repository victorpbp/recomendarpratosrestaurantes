import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

interface MenuItem {
  id: string;
  name: string;
  ingredients: string[];
  kcal: number;
  isActive: boolean;
}

@Schema()
export class Restaurant {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop({ type: [{ type: Object, required: true }] })
  menu: MenuItem[];

  @Prop()
  isActive: boolean;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
