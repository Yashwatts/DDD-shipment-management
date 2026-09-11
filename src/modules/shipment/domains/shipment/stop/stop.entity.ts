import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ShipmentEntity } from '../shipment.entity';
import { StopType } from './enums/stop-type.enum';
import { StopStatus } from './enums/stop-status.enum';
import { CreateStopParams } from './interfaces/create-stop.interface';
import { StopAlreadyArrivedException } from './exceptions/stop-already-arrived.exception';
import { NotPickupStopException } from './exceptions/not-pickup-stop.exception';
import { StopAlreadyDepartedException } from './exceptions/stop-already-departed.exception';
import { StopNotArrivedException } from './exceptions/stop-not-arrived.exception';
import { NotDeliveryStopException } from './exceptions/not-delivery-stop.exception';

@Entity({
  name: 'stops',
  schema: 'shipments_schema',
})
export class StopEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'shipment_id',
    type: 'uuid',
  })
  shipmentId: string;

  @ManyToOne(() => ShipmentEntity, (shipment) => shipment.stops, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shipment_id' })
  shipment: ShipmentEntity;

  @Column({ type: 'int' })
  sequence: number;

  @Column({
    type: 'enum',
    enum: StopType,
  })
  type: StopType;

  @Column({
    type: 'enum',
    enum: StopStatus,
    default: StopStatus.IN_TRANSIT,
  })
  status: StopStatus;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  static create(params: CreateStopParams): StopEntity {
    const stop = new StopEntity();
    stop.id = params.stopId;
    stop.shipmentId = params.shipmentId;
    stop.sequence = params.sequence;
    stop.type = params.type;
    stop.status = StopStatus.IN_TRANSIT;
    stop.address = params.address;
    return stop;
  }

  validateArrive(): void {
    if (
      this.status === StopStatus.ARRIVED ||
      this.status === StopStatus.DEPARTED
    ) {
      throw new StopAlreadyArrivedException();
    }
  }

  validatePickup(): void {
    if (this.type !== StopType.PICKUP) {
      throw new NotPickupStopException();
    }
    if (this.status === StopStatus.DEPARTED) {
      throw new StopAlreadyDepartedException('pickup');
    }
    if (this.status !== StopStatus.ARRIVED) {
      throw new StopNotArrivedException('pickup');
    }
  }

  validateDelivery(): void {
    if (this.type !== StopType.DELIVERY) {
      throw new NotDeliveryStopException();
    }
    if (this.status === StopStatus.DEPARTED) {
      throw new StopAlreadyDepartedException('delivery');
    }
    if (this.status !== StopStatus.ARRIVED) {
      throw new StopNotArrivedException('delivery');
    }
  }

  arrive(): void {
    this.validateArrive();
    this.status = StopStatus.ARRIVED;
  }

  pickup(): void {
    this.validatePickup();
    this.status = StopStatus.DEPARTED;
  }

  deliver(): void {
    this.validateDelivery();
    this.status = StopStatus.DEPARTED;
  }

  isDeparted(): boolean {
    return this.status === StopStatus.DEPARTED;
  }
}
