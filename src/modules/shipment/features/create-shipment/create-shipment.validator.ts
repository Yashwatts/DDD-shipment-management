import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { StopType } from '../../domains/shipment/stop/enums/stop-type.enum';

export class CreateStopValidator {
  @IsUUID()
  @IsNotEmpty({ message: 'Stop ID is required' })
  stopId: string;

  @IsEnum(StopType, {
    message: 'Type must be either Pickup or Delivery',
  })
  type: StopType;

  @IsNumber()
  sequence: number;

  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;
}

export class CreateShipmentValidator {
  @IsArray()
  stops: CreateStopValidator[];
}
