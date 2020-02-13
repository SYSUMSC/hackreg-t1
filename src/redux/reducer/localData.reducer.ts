import { LocalDataAction } from '../action/localData.action';
import { LocalData } from '../type/localData.type';

function resolveLocalData(): LocalData | null {
  const item = localStorage.getItem('localData');
  if (!item) {
    return null;
  }
  const localData: LocalData = JSON.parse(item);
  if (
    !localData.email ||
    !localData.expireTime ||
    new Date().getTime() > localData.expireTime
  ) {
    localStorage.clear();
    return null;
  } else {
    return localData;
  }
}

const initialState: LocalData = resolveLocalData() ?? {
  email: null,
  expireTime: null
};

export default function localData(
  state = initialState,
  action: LocalDataAction
): LocalData {
  switch (action.type) {
    case 'LOCAL_DATA_CLEAR':
      return {
        email: null,
        expireTime: null
      };
    case 'LOCAL_DATA_SET':
      return {
        ...action.payload
      };
    default:
      return state;
  }
}
