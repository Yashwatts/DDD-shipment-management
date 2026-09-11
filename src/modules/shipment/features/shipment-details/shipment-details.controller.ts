import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetShipmentDetailsQuery } from './shipment-details.query';
import { ShipmentResponseValidator } from './shipment-details.validator';

@Controller('shipments/:shipmentId')
export class ShipmentDetailsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getShipmentDetails(
    @Param('shipmentId', ParseUUIDPipe) shipmentId: string,
  ): Promise<ShipmentResponseValidator> {
    return await this.queryBus.execute(new GetShipmentDetailsQuery(shipmentId));
  }
}
