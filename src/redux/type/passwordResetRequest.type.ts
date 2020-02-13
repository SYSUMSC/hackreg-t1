import { ConnectStatus } from './shared';

export interface PasswordResetRequest {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
  readonly form: Readonly<{
    email: string;
  }> | null;
}
