import {
  SignupFormFetchAction,
  SignupFormUpdateAction
} from '../action/connective.action';
import { SignupFormFetchAndUpdate } from '../StateTypes';

const initialState: SignupFormFetchAndUpdate = {
  fetchStatus: { type: 'INITIAL' },
  updateStatus: { type: 'INITIAL' },
  data: null
};

export default function signupFormFetchAndUpdate(
  state = initialState,
  action: SignupFormFetchAction | SignupFormUpdateAction
): SignupFormFetchAndUpdate {
  switch (action.type) {
    case 'SIGNUP_FORM_FETCH_START_CONNECTING':
      return {
        ...state,
        fetchStatus: { type: 'CONNECTING' }
      };
    case 'SIGNUP_FORM_FETCH_CONNECT_SUCCESS':
      return {
        ...state,
        fetchStatus: { type: 'SUCCESS' },
        data: action.payload
      };
    case 'SIGNUP_FORM_FETCH_CONNECT_ERRORED':
      return {
        ...state,
        fetchStatus: { type: 'ERRORED', message: action.message }
      };
    case 'SIGNUP_FORM_FETCH_RESET':
    case 'SIGNUP_FORM_UPDATE_RESET':
      return {
        fetchStatus: { type: 'INITIAL' },
        updateStatus: { type: 'INITIAL' },
        data: null
      };
    case 'SIGNUP_FORM_UPDATE_START_CONNECTING':
      return {
        ...state,
        updateStatus: { type: 'CONNECTING' },
        data: action.payload
      };
    case 'SIGNUP_FORM_UPDATE_CONNECT_SUCCESS':
      return {
        ...state,
        updateStatus: { type: 'SUCCESS' }
      };
    case 'SIGNUP_FORM_UPDATE_CONNECT_ERRORED':
      return {
        ...state,
        updateStatus: { type: 'ERRORED', message: action.message }
      };
    default:
      return state;
  }
}
