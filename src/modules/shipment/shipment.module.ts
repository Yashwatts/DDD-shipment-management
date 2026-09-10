import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateShipmentFeatureModule } from './features/create-shipment/create-shipment.module';

@Module({
  imports: [
    CqrsModule,
    CreateShipmentFeatureModule,
  ],
  providers: [],
})
export class ShipmentModule {}