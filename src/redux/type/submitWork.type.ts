import { ConnectStatus } from './shared';

export interface SubmitWork {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
}
