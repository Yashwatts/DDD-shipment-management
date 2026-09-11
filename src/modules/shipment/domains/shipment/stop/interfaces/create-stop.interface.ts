import { StopType } from '../enums/stop-type.enum';

export interface CreateStopParams {
  stopId: string;
  shipmentId: string;
  sequence: number;
  type: StopType;
  address: string;
}