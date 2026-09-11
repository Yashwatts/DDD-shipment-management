import { StopStatus } from '../enums/stop-status.enum';
import { StopType } from '../enums/stop-type.enum';

export interface StopEvent {
  stopId: string;
  sequence: number;
  type: StopType;
  status: StopStatus;
  address: string;
}
