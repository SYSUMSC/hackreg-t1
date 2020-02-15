import { ConnectStatus } from './shared';

export default interface UserLogin {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
  readonly form: Readonly<{
    email: string;
    password: string;
  }> | null;
}
