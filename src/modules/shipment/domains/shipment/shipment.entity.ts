import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StopEntity } from './stop/stop.entity';
import { ShipmentStatus } from './enums/shipment-status.enum';
import { StopType } from './stop/enums/stop-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { CreateStopShipmentParams } from './interfaces/create-stop-shipment.interface';
import { EmptyStopsException } from './exceptions/empty-stops.exception';
import { DuplicateStopIdException } from './exceptions/duplicate-stop-id.exception';
import { StopNotFoundException } from './exceptions/stop-not-found.exception';
import { PriorStopsNotDepartedException } from './exceptions/prior-stops-not-departed.exception';

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
    const shipment = new ShipmentEntity();
    shipment.id = uuidv4();
    shipment.status = ShipmentStatus.ACTIVE;
    shipment.stops = [];
    for (const stop of stops) {
      shipment.createStop(stop);
    }

    return shipment;
  }

  createStop(params: CreateStopShipmentParams): StopEntity {
    const stopAlreadyExists = this.stops.some(
      (stop) => stop.id === params.stopId,
    );
    if (stopAlreadyExists) {
      throw new DuplicateStopIdException(params.stopId);
    }

    const newStop = StopEntity.create({
      stopId: params.stopId,
      shipmentId: this.id,
      sequence: params.sequence,
      type: params.type === 'Pickup' ? StopType.PICKUP : StopType.DELIVERY,
      address: params.address,
    });
    
    this.stops.push(newStop);
    return newStop;
  }

  arriveAtStop(stopId: string): void {
    const targetStop = this.stops.find((stop) => stop.id === stopId);
    if (!targetStop) {
      throw new StopNotFoundException(stopId);

    }
    const priorIncompleteStops = this.stops.filter(
      (stop) => stop.sequence < targetStop.sequence && !stop.isDeparted(),
    );
    if (priorIncompleteStops.length > 0) {
      throw new PriorStopsNotDepartedException();
    }
    targetStop.arrive();
  }

  pickupAtStop(stopId: string): void {
    const targetStop = this.stops.find((stop) => stop.id === stopId);
    if (!targetStop) {
      throw new StopNotFoundException(stopId);
    }
    targetStop.pickup();
    this.checkAndMarkCompleted();
  }

  deliverAtStop(stopId: string): void {
    const targetStop = this.stops.find((stop) => stop.id === stopId);
    if (!targetStop) {
      throw new StopNotFoundException(stopId);
    }
    targetStop.deliver();
    this.checkAndMarkCompleted();
  }

  private checkAndMarkCompleted(): void {
    const allStopsDeparted = this.stops.every((stop) => stop.isDeparted());
    if (allStopsDeparted && this.status !== ShipmentStatus.COMPLETED) {
      this.status = ShipmentStatus.COMPLETED;
    }
  }
}
