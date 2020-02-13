import { ConnectStatus } from './shared';

export interface UserRegister {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
  readonly form: Readonly<{
    email: string;
    password: string;
  }> | null;
}
