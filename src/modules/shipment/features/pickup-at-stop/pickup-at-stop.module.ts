import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { StopEntity } from '../../domains/shipment/stop/stop.entity';
import { PickupAtStopController } from './pickup-at-stop.controller';
import { PickupAtStopHandler } from './pickup-at-stop.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ShipmentEntity, StopEntity])],
  controllers: [PickupAtStopController],
  providers: [PickupAtStopHandler],
})
export class PickupAtStopFeatureModule {}
