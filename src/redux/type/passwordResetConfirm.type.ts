import { ConnectStatus } from './shared';

export interface PasswordResetConfirm {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
  readonly form: Readonly<{
    password: string;
    confirmPassword: string;
  }> | null;
}
