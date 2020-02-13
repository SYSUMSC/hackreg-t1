import { PasswordResetRequestAction } from '../action/connective.action';
import { PasswordResetRequest } from '../type/passwordResetRequest.type';

const initialState: PasswordResetRequest = {
  connectStatus: { type: 'INITIAL' },
  modalShown: false,
  form: null
};

export default function passwordResetRequest(
  state = initialState,
  action: PasswordResetRequestAction
): PasswordResetRequest {
  switch (action.type) {
    case 'PASSWORD_RESET_REQUEST_START_CONNECTING':
      return {
        ...state,
        connectStatus: { type: 'CONNECTING' },
        form: action.payload
      };
    case 'PASSWORD_RESET_REQUEST_CONNECT_ERRORED':
      return {
        ...state,
        connectStatus: {
          type: 'ERRORED',
          message: action.message
        }
      };
    case 'PASSWORD_RESET_REQUEST_CONNECT_SUCCESS':
      return {
        ...state,
        connectStatus: { type: 'SUCCESS' }
      };
    case 'PASSWORD_RESET_REQUEST_RESET':
      return {
        ...state,
        connectStatus: { type: 'INITIAL' },
        form: null
      };
    case 'PASSWORD_RESET_REQUEST_SHOW_MODAL':
      return {
        ...state,
        modalShown: true
      };
    case 'PASSWORD_RESET_REQUEST_HIDE_MODAL':
      return {
        ...state,
        modalShown: false
      };
    default:
      return state;
  }
}
