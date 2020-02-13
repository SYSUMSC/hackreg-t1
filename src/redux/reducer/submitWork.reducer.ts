import { SubmitWorkAction } from '../action/connective.action';
import { SubmitWork } from '../type/submitWork.type';

const initialState: SubmitWork = {
  connectStatus: { type: 'INITIAL' },
  modalShown: false
};

export default function submitWork(
  state = initialState,
  action: SubmitWorkAction
): SubmitWork {
  switch (action.type) {
    case 'SUBMIT_WORK_START_CONNECTING':
      return {
        ...state,
        connectStatus: { type: 'CONNECTING' }
      };
    case 'SUBMIT_WORK_CONNECT_SUCCESS':
      return {
        ...state,
        connectStatus: { type: 'SUCCESS' }
      };
    case 'SUBMIT_WORK_CONNECT_ERRORED':
      return {
        ...state,
        connectStatus: { type: 'ERRORED', message: action.message }
      };
    case 'SUBMIT_WORK_RESET':
      return { ...state, connectStatus: { type: 'INITIAL' } };
    case 'SUBMIT_WORK_SHOW_MODAL':
      return {
        ...state,
        modalShown: true
      };
    case 'SUBMIT_WORK_HIDE_MODAL':
      return {
        ...state,
        modalShown: false
      };
    default:
      return state;
  }
}
