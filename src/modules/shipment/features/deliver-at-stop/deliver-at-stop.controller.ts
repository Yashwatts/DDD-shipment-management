import { Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeliverAtStopCommand } from './deliver-at-stop.command';

@Controller('shipments/:shipmentId/stops/:stopId/deliver')
export class DeliverAtStopController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch()
  async deliverAtStop(
    @Param('shipmentId', ParseUUIDPipe) shipmentId: string,
    @Param('stopId', ParseUUIDPipe) stopId: string,
  ): Promise<{ message: string }> {
    return await this.commandBus.execute(new DeliverAtStopCommand(shipmentId, stopId));
  }
}
