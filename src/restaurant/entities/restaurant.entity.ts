import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MenuItem } from './menuItem';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
  @Prop()
  cnpj: string;

  @Prop()
  name: string;

  @Prop({ type: [{ type: Object, required: true }] })
  menu: MenuItem[];

  @Prop()
  isActive: boolean;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
