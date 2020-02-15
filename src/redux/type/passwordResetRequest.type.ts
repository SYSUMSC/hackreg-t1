import { ConnectStatus } from './shared';

export default interface PasswordResetRequest {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
  readonly form: Readonly<{
    email: string;
  }> | null;
}
