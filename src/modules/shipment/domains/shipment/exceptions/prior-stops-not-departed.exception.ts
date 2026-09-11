import { ProblemDocument } from 'http-problem-details';

export class PriorStopsNotDepartedException extends Error {
  public doc: ProblemDocument;
  public status = 409;
  constructor() {
    super('Cannot arrive at stop. Prior stops have not departed yet.');
    this.doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/prior-stops-not-departed',
      title: 'Prior Stops Not Departed',
      detail: this.message,
      status: this.status,
    });
  }
}
