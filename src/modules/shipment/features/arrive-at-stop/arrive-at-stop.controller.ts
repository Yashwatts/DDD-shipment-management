import { Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ArriveAtStopCommand } from './arrive-at-stop.command';

@Controller('shipments/:shipmentId/stops/:stopId/arrive')
export class ArriveAtStopController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch()
  async arriveAtStop(
    @Param('shipmentId', ParseUUIDPipe) shipmentId: string,
    @Param('stopId', ParseUUIDPipe) stopId: string,
  ): Promise<{ message: string }> {
    return await this.commandBus.execute(new ArriveAtStopCommand(shipmentId, stopId));
  }
}
