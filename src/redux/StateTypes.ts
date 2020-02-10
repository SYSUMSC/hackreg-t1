import { ConnectStatus } from './type/shared';

export interface LocalData {
  readonly email: string | null;
  readonly expireTime: number | null;
}

export interface UserLogin {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
  readonly form: Readonly<{
    email: string | null;
    password: string | null;
  }>;
}

export interface UserRegister {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
  readonly form: Readonly<{
    email: string | null;
    password: string | null;
  }>;
}

export interface UserLogout {
  readonly connectStatus: ConnectStatus;
}

export interface PasswordResetRequest {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
  readonly form: Readonly<{
    email: string | null;
  }>;
}

export interface PasswordResetConfirm {
  readonly connectStatus: ConnectStatus;
  readonly modalShown: boolean;
  readonly form: Readonly<{
    email: string | null;
    token: string | null;
    password: string | null;
  }>;
}
