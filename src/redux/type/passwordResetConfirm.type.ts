import { ConnectStatus } from './shared';

export default interface PasswordResetConfirm {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
  readonly form: Readonly<{
    password: string;
    confirmPassword: string;
  }> | null;
}
