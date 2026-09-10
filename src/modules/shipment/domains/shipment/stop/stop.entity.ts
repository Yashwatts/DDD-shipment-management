import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ShipmentEntity } from '../shipment.entity';
import { StopType } from '../../enums/stop-type.enum';
import { StopStatus } from '../../enums/stop-status.enum';
import { CreateStopParams } from '../../interfaces/create-stop.interface';

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

  arrive(): void {
    this.status = StopStatus.ARRIVED;
  }

  pickup(): void {
    this.status = StopStatus.DEPARTED;
  }

  deliver(): void {
    this.status = StopStatus.DEPARTED;
  }
}
