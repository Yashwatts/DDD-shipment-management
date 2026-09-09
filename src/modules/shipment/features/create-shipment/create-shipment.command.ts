import { CreateStopValidator } from './create-shipment.validator';
import { Command } from '@nestjs/cqrs';

export class CreateShipmentCommand extends Command<{ shipmentId: string }> {
  constructor(public readonly stops: CreateStopValidator[]) {
    super();
  }
}
