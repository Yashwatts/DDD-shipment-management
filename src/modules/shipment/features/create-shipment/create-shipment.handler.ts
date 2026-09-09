import { CommandHandler } from '@nestjs/cqrs';
import { CreateShipmentCommand } from './create-shipment.command';

@CommandHandler(CreateShipmentCommand)
export class CreateShipmentHandler {
  async execute(
    command: CreateShipmentCommand,
  ): Promise<{ shipmentId: string }> {
    return { shipmentId: 'dummy-shipment-id' };
  }
}
