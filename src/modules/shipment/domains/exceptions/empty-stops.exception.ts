import { HttpException, HttpStatus } from '@nestjs/common';
import { ProblemDocument } from 'http-problem-details';

export class EmptyStopsException extends HttpException {
  constructor() {
    const doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/empty-stops',
      title: 'Invalid Shipment Stops',
      detail: 'A shipment must contain at least one stop.',
      status: HttpStatus.BAD_REQUEST,
    });
    super(doc, HttpStatus.BAD_REQUEST);
  }
}
