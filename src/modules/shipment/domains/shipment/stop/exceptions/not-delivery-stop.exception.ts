import { ProblemDocument } from 'http-problem-details';

export class NotDeliveryStopException extends Error {
  public doc: ProblemDocument;
  public status = 422;
  constructor() {
    super(`Cannot deliver at stop. Stop is not a delivery stop.`);
    const doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/not-delivery-stop',
      title: 'Invalid Stop Type',
      detail: this.message,
      status: this.status,
    });
  }
}
