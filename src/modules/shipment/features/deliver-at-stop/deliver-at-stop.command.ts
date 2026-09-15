import { Command } from '@nestjs/cqrs';

export class DeliverAtStopCommand extends Command<{ message: string }> {
  constructor(
    public readonly shipmentId: string,
    public readonly stopId: string,
  ) {
    super();
  }
}
