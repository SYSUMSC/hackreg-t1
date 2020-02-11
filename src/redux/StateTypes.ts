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
    password: string | null;
    confirmPassword: string | null;
  }>;
}

export type MemberFormValues = {
  name: string;
  gender: string;
  captain: boolean;
  email: string;
  phone: string;
  size: string;
  school: string;
  education: string;
  grade: string;
  profession: string;
  experience: string;
};

export type SignupFormValues = {
  teamInfo: {
    name: string;
    description: string;
  };
  memberInfo: MemberFormValues[];
};

export type SignupFormData = {
  confirmed: boolean;
  form: SignupFormValues;
};

export interface SignupFormFetchAndUpdate {
  readonly fetchStatus: ConnectStatus;
  readonly updateStatus: ConnectStatus;
  readonly data: Readonly<SignupFormData> | null;
}
