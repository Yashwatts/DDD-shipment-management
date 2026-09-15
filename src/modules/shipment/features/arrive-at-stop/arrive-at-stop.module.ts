import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { ArriveAtStopController } from './arrive-at-stop.controller';
import { ArriveAtStopHandler } from './arrive-at-stop.handler';
import { StopEntity } from '../../domains/shipment/stop/stop.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ShipmentEntity, StopEntity])],
  controllers: [ArriveAtStopController],
  providers: [ArriveAtStopHandler],
})
export class ArriveAtStopFeatureModule {}
