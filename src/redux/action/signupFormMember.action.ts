export type SignupFormUpdateMemberAction =
  | {
      type: 'SIGNUP_FORM_UPDATE_SET_CAPTAIN';
      index: number;
    }
  | {
      type: 'SIGNUP_FORM_UPDATE_REMOVE_MEMBER';
      index: number;
    }
  | {
      type: 'SIGNUP_FORM_UPDATE_ADD_MEMBER';
      isCaptain: boolean;
    };
