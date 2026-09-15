import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetShipmentDetailsQuery } from './get-shipment-details.query';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { ShipmentResponseValidator } from './get-shipment-details.validator';
import { ShipmentNotFoundException } from '../../domains/shipment/exceptions/shipment-not-found.exception';

@QueryHandler(GetShipmentDetailsQuery)
export class GetShipmentDetailsHandler implements IQueryHandler<GetShipmentDetailsQuery> {
  constructor(
    @InjectRepository(ShipmentEntity)
    private readonly shipmentRepository: Repository<ShipmentEntity>,
  ) {}

  async execute(
    query: GetShipmentDetailsQuery,
  ): Promise<ShipmentResponseValidator> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id: query.shipmentId },
      relations: ['stops'],
    });

    if (!shipment) {
      throw new ShipmentNotFoundException(query.shipmentId);
    }

    const shipmentStops = [...shipment.stops];

    return {
      shipmentId: shipment.id,
      status: shipment.status,
      stops: shipmentStops.map((stop) => ({
        stopId: stop.id,
        sequence: stop.sequence,
        type: stop.type,
        status: stop.status,
        address: stop.address,
      })),
    };
  }
}
