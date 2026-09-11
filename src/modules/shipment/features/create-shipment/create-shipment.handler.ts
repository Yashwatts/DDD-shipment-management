import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateShipmentCommand } from './create-shipment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { Repository } from 'typeorm';
import { ShipmentCreatedEvent } from '../../domains/shipment/events/shipment-created.event';

@CommandHandler(CreateShipmentCommand)
export class CreateShipmentHandler implements ICommandHandler<CreateShipmentCommand> {
  constructor(
    @InjectRepository(ShipmentEntity)
    private readonly shipmentRepository: Repository<ShipmentEntity>,
  ) {}

  async execute(
    command: CreateShipmentCommand,
  ): Promise<{ shipmentId: string }> {
    const shipment = ShipmentEntity.create(command.stops);

    await this.shipmentRepository.save(shipment);

    const event = new ShipmentCreatedEvent(
      shipment.id,
      shipment.stops.map((stop) => ({
        stopId: stop.id,
        sequence: stop.sequence,
        type: stop.type,
        status: stop.status,
        address: stop.address,
      })),
    );
    console.log('Shipment Created Event:', event);

    return { shipmentId: shipment.id };
  }
}
