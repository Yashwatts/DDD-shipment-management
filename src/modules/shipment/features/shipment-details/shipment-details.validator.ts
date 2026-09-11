export class ShipmentResponseValidator {
  shipmentId: string;
  status: string;
  stops: {
    stopId: string;
    sequence: number;
    type: string;
    status: string;
    address: string;
  }[];
}