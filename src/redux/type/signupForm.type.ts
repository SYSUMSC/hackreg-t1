import { ConnectStatus } from './shared';

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

export default interface SignupFormFetchAndUpdate {
  readonly fetchStatus: ConnectStatus;
  readonly updateStatus: ConnectStatus;
  readonly data: Readonly<SignupFormData> | null;
}
