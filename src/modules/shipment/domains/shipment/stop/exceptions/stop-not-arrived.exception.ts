import { ProblemDocument } from 'http-problem-details';

export class StopNotArrivedException extends Error {
  public doc: ProblemDocument;
  public status = 400;
  constructor(action: 'pickup' | 'delivery') {
    super(`Cannot ${action} at stop. Stop has not yet arrived.`);
    const doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/stop-not-arrived',
      title: 'Stop Not Arrived',
      detail: this.message,
      status: this.status,
    });
  }
}
