import { StopType } from '../enums/stop-type.enum';

export interface CreateStopShipmentParams {
  stopId: string;
  sequence: number;
  type: StopType;
  address: string;
}