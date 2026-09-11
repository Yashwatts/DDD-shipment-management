import { ProblemDocument } from 'http-problem-details';

export class NotPickupStopException extends Error {
  public doc: ProblemDocument;
  public status = 422;
  constructor() {
    super(`Cannot pickup at stop. Stop is not a pickup stop.`);
    const doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/not-pickup-stop',
      title: 'Invalid Stop Type',
      detail: this.message,
      status: this.status,
    });
  }
}
