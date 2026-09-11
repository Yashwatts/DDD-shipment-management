import { ProblemDocument } from 'http-problem-details';

export class EmptyStopsException extends Error {
  public doc: ProblemDocument;
  public status = 400;
  constructor() {
    super('A shipment must contain at least one stop.');
    this.doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/empty-stops',
      title: 'Invalid Shipment Stops',
      detail: this.message,
      status: this.status,
    });
  }
}
