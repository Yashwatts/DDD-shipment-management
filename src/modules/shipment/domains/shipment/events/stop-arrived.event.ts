import { v4 as uuidv4 } from 'uuid';

export class StopArrivedEvent {
  readonly eventId: string;
  readonly occurredAt: string;

  constructor(
    readonly shipmentId: string,
    readonly stopId: string,
  ) {
    this.eventId = uuidv4();
    this.occurredAt = new Date().toISOString();
  }
}
