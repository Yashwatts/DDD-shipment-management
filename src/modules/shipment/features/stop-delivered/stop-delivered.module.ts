import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { StopEntity } from '../../domains/shipment/stop/stop.entity';
import { StopDeliveredController } from './stop-delivered.controller';
import { StopDeliveredHandler } from './stop-delivered.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ShipmentEntity, StopEntity])],
  controllers: [StopDeliveredController],
  providers: [StopDeliveredHandler],
})
export class StopDeliveredFeatureModule {}
