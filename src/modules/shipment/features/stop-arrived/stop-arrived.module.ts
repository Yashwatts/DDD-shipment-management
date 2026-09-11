import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { StopArrivedController } from './stop-arrived.controller';
import { StopArrivedHandler } from './stop-arrived.handler';
import { StopEntity } from '../../domains/shipment/stop/stop.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ShipmentEntity, StopEntity])],
  controllers: [StopArrivedController],
  providers: [StopArrivedHandler],
})
export class StopArrivedFeatureModule {}
