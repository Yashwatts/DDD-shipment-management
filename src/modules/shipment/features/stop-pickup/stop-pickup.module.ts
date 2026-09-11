import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { StopEntity } from '../../domains/shipment/stop/stop.entity';
import { StopPickupController } from './stop-pickup.controller';
import { StopPickupHandler } from './stop-pickup.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ShipmentEntity, StopEntity])],
  controllers: [StopPickupController],
  providers: [StopPickupHandler],
})
export class StopPickupFeatureModule {}
