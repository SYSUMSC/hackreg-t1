import { combineReducers, createStore, applyMiddleware } from 'redux';
import localData from './reducer/localData.reducer';
import passwordResetConfirm from './reducer/passwordResetConfirm.reducer';
import passwordResetRequest from './reducer/passwordResetRequest.reducer';
import userLogin from './reducer/userLogin.reducer';
import userLogout from './reducer/userLogout.reducer';
import userRegister from './reducer/userRegister.reducer';
import signupFormFetchAndUpdate from './reducer/signupFormFetchAndUpdate.reducer';
import submitWork from './reducer/submitWork.reducer';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const rootReducer = combineReducers({
  localData,
  passwordResetConfirm,
  passwordResetRequest,
  userLogin,
  userRegister,
  userLogout,
  signupFormFetchAndUpdate,
  submitWork
});

const composeEnhancers = composeWithDevTools({ trace: true });

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
export type StoreType = typeof store;
export type StateType = ReturnType<typeof store.getState>;
