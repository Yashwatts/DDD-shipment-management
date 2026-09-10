import { StopEvent } from '../interfaces/events-stop.interface';
import { v4 as uuidv4 } from 'uuid';

export class ShipmentCreatedEvent {
  readonly eventId: string;
  readonly occurredAt: string;

  constructor(
    readonly shipmentId: string,
    readonly stops: StopEvent[],
  ) {
    this.eventId = uuidv4();
    this.occurredAt = new Date().toISOString();
  }
}