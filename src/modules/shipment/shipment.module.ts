import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateShipmentFeatureModule } from './features/create-shipment/create-shipment.module';
import { StopArrivedFeatureModule } from './features/stop-arrived/stop-arrived.module';
import { StopPickupFeatureModule } from './features/stop-pickup/stop-pickup.module';
import { StopDeliveredFeatureModule } from './features/stop-delivered/stop-delivered.module';
import { ShipmentDetailsFeatureModule } from './features/shipment-details/shipment-details.module';

@Module({
  imports: [
    CqrsModule,
    CreateShipmentFeatureModule,
    StopArrivedFeatureModule,
    StopPickupFeatureModule,
    StopDeliveredFeatureModule,
    ShipmentDetailsFeatureModule,
  ],
  providers: [],
})
export class ShipmentModule {}
