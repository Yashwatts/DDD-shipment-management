import { ProblemDocument } from 'http-problem-details';

export class StopAlreadyArrivedException extends Error {
  public doc: ProblemDocument;
  public status = 409;
  constructor() {
    super(`Cannot arrive at stop. Stop has already arrived.`);
    const doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/stop-already-arrived',
      title: 'Stop Already Arrived',
      detail: this.message,
      status: this.status,
    });
  }
}
