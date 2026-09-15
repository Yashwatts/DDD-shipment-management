import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArriveAtStopCommand } from './arrive-at-stop.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipmentEntity } from '../../domains/shipment/shipment.entity';
import { Repository } from 'typeorm';
import { ShipmentNotFoundException } from '../../domains/shipment/exceptions/shipment-not-found.exception';
import { ArriveAtStopEvent } from '../../domains/shipment/events/stop-arrived.event';

@CommandHandler(ArriveAtStopCommand)
export class ArriveAtStopHandler implements ICommandHandler<ArriveAtStopCommand> {
  constructor(
    @InjectRepository(ShipmentEntity)
    private readonly shipmentRepository: Repository<ShipmentEntity>,
  ) {}

  async execute(command: ArriveAtStopCommand): Promise<{ message: string }> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id: command.shipmentId },
      relations: ['stops'],
    });

    if (!shipment) {
      throw new ShipmentNotFoundException(command.shipmentId);
    }
    shipment.arriveAtStop(command.stopId);
    await this.shipmentRepository.save(shipment);

    const event = new ArriveAtStopEvent(shipment.id, command.stopId);
    console.log('Stop Arrived Event:', event);
    
    return { message: 'Arrived at stop successfully' };
  }
}
