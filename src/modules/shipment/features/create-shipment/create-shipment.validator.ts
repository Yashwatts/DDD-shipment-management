import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStopValidator {
  @IsNumber()
  stopId: number;
  @IsEnum(['Pickup', 'Delivery'], {
    message: 'Type must be either Pickup or Delivery',
  })
  type: 'Pickup' | 'Delivery';
  @IsNumber()
  sequence: number;
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;
}

export class CreateShipmentValidator {
  @IsArray()
  @ArrayMinSize(1, { message: 'A shipment must contain at least one stop.' })
  @ValidateNested({ each: true })
  @Type(() => CreateStopValidator)
  stops: CreateStopValidator[];
}
