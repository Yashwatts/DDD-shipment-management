import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateShipmentValidator } from './create-shipment.validator';
import { CreateShipmentCommand } from './create-shipment.command';

@Controller('shipments')
export class CreateShipmentController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createShipment(
    @Body() createShipmentValidator: CreateShipmentValidator,
  ) {
    return await this.commandBus.execute(
      new CreateShipmentCommand(createShipmentValidator.stops),
    );
  }
}
