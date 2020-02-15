import { UserLogoutAction } from '../action/connective.action';
import UserLogout from '../type/userLogout.type';

const initialState: UserLogout = {
  connectStatus: { type: 'INITIAL' }
};

export default function userLogout(
  state = initialState,
  action: UserLogoutAction
): UserLogout {
  switch (action.type) {
    case 'USER_LOGOUT_START_CONNECTING':
      return {
        connectStatus: { type: 'CONNECTING' }
      };
    case 'USER_LOGOUT_CONNECT_SUCCESS':
      return {
        connectStatus: { type: 'SUCCESS' }
      };
    case 'USER_LOGOUT_CONNECT_ERRORED':
      return {
        connectStatus: { type: 'ERRORED', message: action.message }
      };
    case 'USER_LOGOUT_RESET':
      return { connectStatus: { type: 'INITIAL' } };
    default:
      return state;
  }
}
