import { ProblemDocument } from 'http-problem-details';

export class StopAlreadyDepartedException extends Error {
  public doc: ProblemDocument;
  public status = 409;
  constructor(action: 'pickup' | 'delivery') {
    super(`Cannot ${action} at stop. Stop has already departed.`);
    const doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/stop-already-departed',
      title: 'Stop Already Departed',
      detail: this.message,
      status: this.status,
    });
  }
}
