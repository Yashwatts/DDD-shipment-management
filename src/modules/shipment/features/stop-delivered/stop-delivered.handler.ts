import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { Repository } from 'typeorm';
import { ShipmentNotFoundException } from '../../domains/shipment/exceptions/shipment-not-found.exception';
import { StopDeliveredCommand } from './stop-delivered.command';
import { StopCompletedEvent } from '../../domains/shipment/events/stop-completed.event';

@CommandHandler(StopDeliveredCommand)
export class StopDeliveredHandler implements ICommandHandler<StopDeliveredCommand> {
  constructor(
    @InjectRepository(ShipmentEntity)
    private readonly shipmentRepository: Repository<ShipmentEntity>,
  ) {}

  async execute(command: StopDeliveredCommand): Promise<{ message: string }> {
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
