import { UserLoginAction } from '../action/connective.action';
import UserLogin from '../type/userLogin.type';

const initialState: UserLogin = {
  connectStatus: { type: 'INITIAL' },
  modalShown: false,
  form: null
};

export default function userLogin(
  state = initialState,
  action: UserLoginAction
): UserLogin {
  switch (action.type) {
    case 'USER_LOGIN_START_CONNECTING':
      return {
        ...state,
        connectStatus: { type: 'CONNECTING' },
        form: action.payload
      };
    case 'USER_LOGIN_CONNECT_ERRORED':
      return {
        ...state,
        connectStatus: {
          type: 'ERRORED',
          message: action.message
        }
      };
    case 'USER_LOGIN_CONNECT_SUCCESS':
      return {
        ...state,
        connectStatus: { type: 'SUCCESS' }
      };
    case 'USER_LOGIN_RESET':
      return {
        ...state,
        connectStatus: { type: 'INITIAL' },
        form: null
      };
    case 'USER_LOGIN_SHOW_MODAL':
      return {
        ...state,
        modalShown: true
      };
    case 'USER_LOGIN_HIDE_MODAL':
      return {
        ...state,
        modalShown: false
      };
    default:
      return state;
  }
}
