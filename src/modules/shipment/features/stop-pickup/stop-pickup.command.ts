import { Command } from '@nestjs/cqrs';

export class StopPickupCommand extends Command<{ message: string }> {
  constructor(
    public readonly shipmentId: string,
    public readonly stopId: string,
  ) {
    super();
  }
}
