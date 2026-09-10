import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateShipmentHandler } from './create-shipment.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { StopEntity } from '../../domains/shipment/stop/stop.entity';
import { CreateShipmentController } from './create-shipment.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ShipmentEntity, StopEntity])],
  controllers: [CreateShipmentController],
  providers: [CreateShipmentHandler],
})
export class CreateShipmentFeatureModule {}
