import LocalData from '../type/localData.type';

interface ClearAction {
  type: 'LOCAL_DATA_CLEAR';
}

interface SetAction {
  type: 'LOCAL_DATA_SET';
  payload: LocalData;
}

export type LocalDataAction = ClearAction | SetAction;
