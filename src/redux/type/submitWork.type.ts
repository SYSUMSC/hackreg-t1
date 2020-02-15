import { ConnectStatus } from './shared';

export default interface SubmitWork {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
}
