import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateShipmentHandler } from './create-shipment.handler';

@Module({
  imports: [CqrsModule.forRoot()],
  controllers: [],
  providers: [CreateShipmentHandler],
})
export class CreateShipmentFeatureModule {}
