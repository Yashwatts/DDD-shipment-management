import { ProblemDocument } from 'http-problem-details';

export class StopNotFoundException extends Error {
  public doc: ProblemDocument;
  public status = 404;
  constructor(stopId: string) {
    super(`Stop with ID ${stopId} not found in this shipment.`);
    this.doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/stop-not-found',
      title: 'Stop Not Found',
      detail: this.message,
      status: this.status,
    });
  }
}
