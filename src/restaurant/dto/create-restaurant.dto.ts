import { CreateMenuItemDto } from './create-menuitem.dto';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @Length(14, 14, { message: 'O CNPJ deve ter exatamente 14 caracteres.' })
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) // Add this decorator to enable nested validation
  @Type(() => CreateMenuItemDto) // Add this decorator from class-transformer
  menu: CreateMenuItemDto[];
}