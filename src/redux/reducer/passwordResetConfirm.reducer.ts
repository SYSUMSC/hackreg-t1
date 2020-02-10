import { PasswordResetConfirmAction } from '../action/connective.action';
import { PasswordResetConfirm } from '../StateTypes';

const initialState: PasswordResetConfirm = {
  connectStatus: { type: 'INITIAL' },
  modalShown: false,
  form: {
    email: null,
    token: null,
    password: null
  }
};

export default function passwordResetConfirm(
  state = initialState,
  action: PasswordResetConfirmAction
): PasswordResetConfirm {
  switch (action.type) {
    case 'PASSWORD_RESET_CONFIRM_START_CONNECTING':
      return {
        ...state,
        connectStatus: { type: 'CONNECTING' },
        form: action.payload
      };
    case 'PASSWORD_RESET_CONFIRM_CONNECT_ERRORED':
      return {
        ...state,
        connectStatus: {
          type: 'ERRORED',
          message: action.message
        }
      };
    case 'PASSWORD_RESET_CONFIRM_CONNECT_SUCCESS':
      return {
        ...state,
        connectStatus: { type: 'SUCCESS' }
      };
    case 'PASSWORD_RESET_CONFIRM_RESET':
      return {
        ...state,
        connectStatus: { type: 'INITIAL' },
        form: { email: null, token: null, password: null }
      };
    case 'PASSWORD_RESET_CONFIRM_SHOW_MODAL':
      return {
        ...state,
        modalShown: true
      };
    case 'PASSWORD_RESET_CONFIRM_HIDE_MODAL':
      return {
        ...state,
        modalShown: false
      };
    default:
      return state;
  }
}
