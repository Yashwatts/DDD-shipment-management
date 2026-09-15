import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { StopEntity } from '../../domains/shipment/stop/stop.entity';
import { DeliverAtStopController } from './deliver-at-stop.controller';
import { DeliverAtStopHandler } from './deliver-at-stop.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ShipmentEntity, StopEntity])],
  controllers: [DeliverAtStopController],
  providers: [DeliverAtStopHandler],
})
export class DeliverAtStopFeatureModule {}
