import { Command } from '@nestjs/cqrs';

export class PickupAtStopCommand extends Command<{ message: string }> {
  constructor(
    public readonly shipmentId: string,
    public readonly stopId: string,
  ) {
    super();
  }
}
