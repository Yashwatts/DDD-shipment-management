import { HttpException, HttpStatus } from '@nestjs/common';
import { ProblemDocument } from 'http-problem-details';

export class DuplicateStopIdException extends HttpException {
  constructor(stopId: string) {
    const doc = new ProblemDocument({
      type: 'https://api.shipment.com/exceptions/duplicate-stop-id',
      title: 'Duplicate Stop ID',
      detail: `All stops must have a unique stop ID. Duplicate found: ${stopId}`,
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    });
    super(doc, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
