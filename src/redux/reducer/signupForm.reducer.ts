import {
  SignupFormFetchAction,
  SignupFormUpdateAction
} from '../action/connective.action';
import SignupFormFetchAndUpdate, {
  MemberFormValues
} from '../type/signupForm.type';
import update from 'immutability-helper';
import { SignupFormUpdateMemberAction } from '../action/signupFormMember.action';

const initialState: SignupFormFetchAndUpdate = {
  fetchStatus: { type: 'INITIAL' },
  updateStatus: { type: 'INITIAL' },
  data: null
};

export default function signupForm(
  state = initialState,
  action:
    | SignupFormFetchAction
    | SignupFormUpdateAction
    | SignupFormUpdateMemberAction
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
    case 'SIGNUP_FORM_UPDATE_SET_CAPTAIN':
      return update(state, {
        data: {
          form: {
            memberInfo: {
              $apply: (members: MemberFormValues[]) =>
                members.map((member, index) => {
                  if (index === action.index) {
                    return update(member, { captain: { $set: true } });
                  } else if (member.captain) {
                    return update(member, { captain: { $set: false } });
                  } else {
                    return member;
                  }
                })
            }
          }
        }
      });
    case 'SIGNUP_FORM_UPDATE_REMOVE_MEMBER':
      return update(state, {
        data: {
          form: {
            memberInfo: {
              $apply: (members: MemberFormValues[]) =>
                members.filter((_, index) => index !== action.index)
            }
          }
        }
      });
    case 'SIGNUP_FORM_UPDATE_ADD_MEMBER':
      return update(state, {
        data: {
          form: {
            memberInfo: {
              $push: [
                {
                  name: '',
                  gender: '0',
                  captain: action.isCaptain,
                  email: '',
                  phone: '',
                  size: '0',
                  school: '',
                  education: '0',
                  grade: '',
                  profession: '',
                  experience: ''
                }
              ]
            }
          }
        }
      });
    default:
      return state;
  }
}
