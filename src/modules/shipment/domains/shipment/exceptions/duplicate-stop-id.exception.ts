import { ProblemDocument } from 'http-problem-details';

export class DuplicateStopIdException extends Error {
  public doc: ProblemDocument;
  public status = 422;
  constructor(stopId: string) {
    super(`All stops must have a unique stop ID. Duplicate found: ${stopId}`);
    this.doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/duplicate-stop-id',
      title: 'Duplicate Stop ID',
      detail: this.message,
      status: this.status,
    });
  }
}
