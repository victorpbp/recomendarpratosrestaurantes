import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) // Add this decorator to enable nested validation
  @Type(() => CreateMenuItemDto) // Add this decorator from class-transformer
  menu: CreateMenuItemDto[];
}

export class CreateMenuItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  ingredients: string[];

  @IsNotEmpty()
  @IsNumber()
  kcal: number;

  @IsBoolean()
  isActive: boolean;
}
