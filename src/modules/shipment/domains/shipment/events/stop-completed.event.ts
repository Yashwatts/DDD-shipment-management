import { v4 as uuidv4 } from 'uuid';

export class StopCompletedEvent {
  readonly eventId: string;
  readonly occurredAt: string;

  constructor(
    readonly shipmentId: string,
    readonly stopId: string,
    readonly action: 'Pickup' | 'Delivery',
  ) {
    this.eventId = uuidv4();
    this.occurredAt = new Date().toISOString();
  }
}
