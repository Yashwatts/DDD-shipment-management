import { Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { StopPickupCommand } from './stop-pickup.command';

@Controller('shipments/:shipmentId/stops/:stopId/pickup')
export class StopPickupController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async pickupAtStop(
    @Param('shipmentId', ParseUUIDPipe) shipmentId: string,
    @Param('stopId', ParseUUIDPipe) stopId: string,
  ): Promise<{ message: string }> {
    return await this.commandBus.execute(new StopPickupCommand(shipmentId, stopId));
  }
}
