import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateShipmentFeatureModule } from './features/create-shipment/create-shipment.module';
import { ArriveAtStopFeatureModule } from './features/arrive-at-stop/arrive-at-stop.module';
import { PickupAtStopFeatureModule } from './features/pickup-at-stop/pickup-at-stop.module';
import { DeliverAtStopFeatureModule } from './features/deliver-at-stop/deliver-at-stop.module';
import { GetShipmentDetailsFeatureModule } from './features/get-shipment-details/get-shipment-details.module';

@Module({
  imports: [
    CqrsModule,
    CreateShipmentFeatureModule,
    ArriveAtStopFeatureModule,
    PickupAtStopFeatureModule,
    DeliverAtStopFeatureModule,
    GetShipmentDetailsFeatureModule,
  ],
  providers: [],
})
export class ShipmentModule {}
