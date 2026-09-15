import { Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PickupAtStopCommand } from './pickup-at-stop.command';

@Controller('shipments/:shipmentId/stops/:stopId/pickup')
export class PickupAtStopController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch()
  async pickupAtStop(
    @Param('shipmentId', ParseUUIDPipe) shipmentId: string,
    @Param('stopId', ParseUUIDPipe) stopId: string,
  ): Promise<{ message: string }> {
    return await this.commandBus.execute(new PickupAtStopCommand(shipmentId, stopId));
  }
}
