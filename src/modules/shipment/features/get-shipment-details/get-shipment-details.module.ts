import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { GetShipmentDetailsController } from './get-shipment-details.controller';
import { GetShipmentDetailsHandler } from './get-shipment-details.handler';
import { StopEntity } from '../../domains/shipment/stop/stop.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ShipmentEntity, StopEntity])],
  controllers: [GetShipmentDetailsController],
  providers: [GetShipmentDetailsHandler],
})
export class GetShipmentDetailsFeatureModule {}
