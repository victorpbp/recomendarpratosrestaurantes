import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

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