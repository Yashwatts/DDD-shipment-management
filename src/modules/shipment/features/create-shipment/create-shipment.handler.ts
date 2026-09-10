import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateShipmentCommand } from './create-shipment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { Repository } from 'typeorm';

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
    return { shipmentId: shipment.id };
  }
}
