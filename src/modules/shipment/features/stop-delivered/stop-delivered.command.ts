import { Command } from '@nestjs/cqrs';

export class StopDeliveredCommand extends Command<{ message: string }> {
  constructor(
    public readonly shipmentId: string,
    public readonly stopId: string,
  ) {
    super();
  }
}
