import { UserRegisterAction } from '../action/connective.action';
import UserRegister from '../type/userRegister.type';

const initialState: UserRegister = {
  connectStatus: { type: 'INITIAL' },
  modalShown: false,
  form: null
};

export default function userRegister(
  state = initialState,
  action: UserRegisterAction
): UserRegister {
  switch (action.type) {
    case 'USER_REGISTER_START_CONNECTING':
      return {
        ...state,
        connectStatus: { type: 'CONNECTING' },
        form: action.payload
      };
    case 'USER_REGISTER_CONNECT_ERRORED':
      return {
        ...state,
        connectStatus: {
          type: 'ERRORED',
          message: action.message
        }
      };
    case 'USER_REGISTER_CONNECT_SUCCESS':
      return {
        ...state,
        connectStatus: { type: 'SUCCESS' }
      };
    case 'USER_REGISTER_RESET':
      return {
        ...state,
        connectStatus: { type: 'INITIAL' },
        form: null
      };
    case 'USER_REGISTER_SHOW_MODAL':
      return {
        ...state,
        modalShown: true
      };
    case 'USER_REGISTER_HIDE_MODAL':
      return {
        ...state,
        modalShown: false
      };
    default:
      return state;
  }
}
