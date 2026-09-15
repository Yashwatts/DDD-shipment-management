import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { Repository } from 'typeorm';
import { ShipmentNotFoundException } from '../../domains/shipment/exceptions/shipment-not-found.exception';
import { DeliverAtStopCommand } from './deliver-at-stop.command';
import { StopCompletedEvent } from '../../domains/shipment/events/stop-completed.event';

@CommandHandler(DeliverAtStopCommand)
export class DeliverAtStopHandler implements ICommandHandler<DeliverAtStopCommand> {
  constructor(
    @InjectRepository(ShipmentEntity)
    private readonly shipmentRepository: Repository<ShipmentEntity>,
  ) {}

  async execute(command: DeliverAtStopCommand): Promise<{ message: string }> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id: command.shipmentId },
      relations: ['stops'],
    });

    if (!shipment) {
      throw new ShipmentNotFoundException(command.shipmentId);
    }
    shipment.deliverAtStop(command.stopId);
    await this.shipmentRepository.save(shipment);

    const event = new StopCompletedEvent(shipment.id, command.stopId, 'Delivery');
    console.log('Stop Completed Event:', event);
    
    return { message: 'Delivered at stop successfully' };
  }
}
