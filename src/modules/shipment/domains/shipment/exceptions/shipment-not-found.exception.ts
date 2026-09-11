import { ProblemDocument } from 'http-problem-details';

export class ShipmentNotFoundException extends Error {
  public doc: ProblemDocument;
  public status = 404;
  constructor(shipmentId: string) {
    super(`Shipment with ID ${shipmentId} not found.`);
    this.doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/shipment-not-found',
      title: 'Shipment Not Found',
      detail: this.message,
      status: this.status,
    });
  }
}
