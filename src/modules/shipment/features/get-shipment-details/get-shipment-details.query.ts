import { Query } from '@nestjs/cqrs';
import { ShipmentResponseValidator } from './get-shipment-details.validator';

export class GetShipmentDetailsQuery extends Query<ShipmentResponseValidator> {
  constructor(public readonly shipmentId: string) {
    super();
  }
}
