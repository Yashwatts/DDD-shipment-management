import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StopEntity } from './stop/stop.entity';
import { ShipmentStatus } from '../enums/shipment-status.enum';
import { StopType } from '../enums/stop-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { CreateStopShipmentParams } from '../interfaces/create-stop-shipment.interface';
import { ShipmentCreatedEvent } from '../events/shipment-created.event';
import { EmptyStopsException } from '../exceptions/empty-stops.exception';
import { DuplicateStopIdException } from '../exceptions/duplicate-stop-id.exception';

@Entity({
  name: 'shipments',
  schema: 'shipments_schema',
})
export class ShipmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: ShipmentStatus.ACTIVE,
  })
  status: ShipmentStatus;

  @OneToMany(() => StopEntity, (stop) => stop.shipment, {
    cascade: true,
    eager: true,
  })
  stops: StopEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  static create(stops: CreateStopShipmentParams[]): ShipmentEntity {
    if (!stops || stops.length === 0) {
      throw new EmptyStopsException();
    }
    const seenStopIds = new Set<string>();
    for (const stop of stops) {
      if (seenStopIds.has(stop.stopId)) {
        throw new DuplicateStopIdException(stop.stopId);
      }
      seenStopIds.add(stop.stopId);
    }
    const shipment = new ShipmentEntity();
    shipment.id = uuidv4();
    shipment.status = ShipmentStatus.ACTIVE;
    shipment.stops = stops.map((stop) => {
      return StopEntity.create({
        stopId: stop.stopId,
        shipmentId: shipment.id,
        sequence: stop.sequence,
        type: stop.type === 'Pickup' ? StopType.PICKUP : StopType.DELIVERY,
        address: stop.address,
      });
    });

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

    return shipment;
  }

  arriveAtStop(stopId: string): void {
    const targetStop = this.stops.find((stop) => stop.id === stopId);
    if (!targetStop) {
      throw new Error(`Stop with ID ${stopId} not found in this shipment.`);
    }
    targetStop.arrive();
  }

  pickupAtStop(stopId: string): void {
    const targetStop = this.stops.find((stop) => stop.id === stopId);
    if (!targetStop) {
      throw new Error(`Stop with ID ${stopId} not found in this shipment.`);
    }
    targetStop.pickup();
  }

  deliverAtStop(stopId: string): void {
    const targetStop = this.stops.find((stop) => stop.id === stopId);
    if (!targetStop) {
      throw new Error(`Stop with ID ${stopId} not found in this shipment.`);
    }
    targetStop.deliver();
  }
}
