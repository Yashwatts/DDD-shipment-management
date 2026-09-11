import { Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { StopDeliveredCommand } from './stop-delivered.command';

@Controller('shipments/:shipmentId/stops/:stopId/deliver')
export class StopDeliveredController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async deliverAtStop(
    @Param('shipmentId', ParseUUIDPipe) shipmentId: string,
    @Param('stopId', ParseUUIDPipe) stopId: string,
  ): Promise<{ message: string }> {
    return await this.commandBus.execute(new StopDeliveredCommand(shipmentId, stopId));
  }
}
