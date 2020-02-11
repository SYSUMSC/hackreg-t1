import {
  PasswordResetRequest,
  UserLogin,
  UserRegister,
  PasswordResetConfirm,
  SignupFormFetchAndUpdate
} from '../StateTypes';
import { Dispatch } from 'redux';

const createConnectiveAction = <State extends object | null>(
  startType: string,
  successType: string,
  errroredTyoe: string
) => (
  makeApi: () => Promise<Response>,
  payload: State,
  onSuccess: (dispatch: Dispatch) => void = () => {
    /* EMPTY */
  },
  timeout = 8000
) => async (dispatch: Dispatch) => {
  if (payload) {
    dispatch({
      type: startType,
      payload
    });
  } else {
    dispatch({
      type: startType
    });
  }
  try {
    const response = await Promise.race<Promise<Response>>([
      makeApi(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('请求超时，请重试')), timeout)
      )
    ]);
    const data = await response.text();
    if (response.ok) {
      dispatch({
        type: successType,
        payload: data ? JSON.parse(data) : undefined
      });
      try {
        onSuccess(dispatch);
      } catch (error) {
        console.error(error);
      }
    } else {
      throw new Error(JSON.parse(data).message);
    }
  } catch (error) {
    dispatch({
      type: errroredTyoe,
      message: error.message ?? null
    });
  }
};

type ConnectiveStartAction<Type extends string, State extends object | null> = {
  type: Type;
  payload: State;
};

type ConnectiveSuccessAction<
  Type extends string,
  State extends object | null
> = {
  type: Type;
  payload: State;
};

type ConnectiveErroredAction<Type extends string> = {
  type: Type;
  message: string | null;
};

type ConnectiveResetAction<Type extends string> = {
  type: Type;
};

type ConnectiveShowModalAction<Type extends string> = {
  type: Type;
};

type ConnectiveHideModalAction<Type extends string> = {
  type: Type;
};

export type ConnectiveAction<
  Types extends [string, string, string, string],
  State extends object | null = null
> =
  | ConnectiveStartAction<Types[0], State>
  | ConnectiveSuccessAction<Types[1], State>
  | ConnectiveErroredAction<Types[2]>
  | ConnectiveResetAction<Types[3]>;

export type ConnectiveModalAction<
  Types extends [string, string, string, string, string, string],
  State extends object | null = null
> =
  | ConnectiveAction<[Types[0], Types[1], Types[2], Types[3]], State>
  | ConnectiveShowModalAction<Types[4]>
  | ConnectiveHideModalAction<Types[5]>;

export type UserLoginAction = ConnectiveModalAction<
  [
    'USER_LOGIN_START_CONNECTING',
    'USER_LOGIN_CONNECT_SUCCESS',
    'USER_LOGIN_CONNECT_ERRORED',
    'USER_LOGIN_RESET',
    'USER_LOGIN_SHOW_MODAL',
    'USER_LOGIN_HIDE_MODAL'
  ],
  UserLogin['form']
>;
export const createUserLoginAction = createConnectiveAction<UserLogin['form']>(
  'USER_LOGIN_START_CONNECTING',
  'USER_LOGIN_CONNECT_SUCCESS',
  'USER_LOGIN_CONNECT_ERRORED'
);

export type UserRegisterAction = ConnectiveModalAction<
  [
    'USER_REGISTER_START_CONNECTING',
    'USER_REGISTER_CONNECT_SUCCESS',
    'USER_REGISTER_CONNECT_ERRORED',
    'USER_REGISTER_RESET',
    'USER_REGISTER_SHOW_MODAL',
    'USER_REGISTER_HIDE_MODAL'
  ],
  UserRegister['form']
>;
export const createUserRegisterAction = createConnectiveAction<
  UserRegister['form']
>(
  'USER_REGISTER_START_CONNECTING',
  'USER_REGISTER_CONNECT_SUCCESS',
  'USER_REGISTER_CONNECT_ERRORED'
);

export type UserLogoutAction = ConnectiveAction<
  [
    'USER_LOGOUT_START_CONNECTING',
    'USER_LOGOUT_CONNECT_SUCCESS',
    'USER_LOGOUT_CONNECT_ERRORED',
    'USER_LOGOUT_RESET'
  ]
>;
export const createUserLogoutAction = createConnectiveAction<null>(
  'USER_LOGOUT_START_CONNECTING',
  'USER_LOGOUT_CONNECT_SUCCESS',
  'USER_LOGOUT_CONNECT_ERRORED'
);

export type PasswordResetRequestAction = ConnectiveModalAction<
  [
    'PASSWORD_RESET_REQUEST_START_CONNECTING',
    'PASSWORD_RESET_REQUEST_CONNECT_SUCCESS',
    'PASSWORD_RESET_REQUEST_CONNECT_ERRORED',
    'PASSWORD_RESET_REQUEST_RESET',
    'PASSWORD_RESET_REQUEST_SHOW_MODAL',
    'PASSWORD_RESET_REQUEST_HIDE_MODAL'
  ],
  PasswordResetRequest['form']
>;
export const createPasswordResetRequestAction = createConnectiveAction<
  PasswordResetRequest['form']
>(
  'PASSWORD_RESET_REQUEST_START_CONNECTING',
  'PASSWORD_RESET_REQUEST_CONNECT_SUCCESS',
  'PASSWORD_RESET_REQUEST_CONNECT_ERRORED'
);

export type PasswordResetConfirmAction = ConnectiveModalAction<
  [
    'PASSWORD_RESET_CONFIRM_START_CONNECTING',
    'PASSWORD_RESET_CONFIRM_CONNECT_SUCCESS',
    'PASSWORD_RESET_CONFIRM_CONNECT_ERRORED',
    'PASSWORD_RESET_CONFIRM_RESET',
    'PASSWORD_RESET_CONFIRM_SHOW_MODAL',
    'PASSWORD_RESET_CONFIRM_HIDE_MODAL'
  ],
  PasswordResetConfirm['form']
>;
export const createPasswordResetConfirmAction = createConnectiveAction<
  PasswordResetConfirm['form']
>(
  'PASSWORD_RESET_CONFIRM_START_CONNECTING',
  'PASSWORD_RESET_CONFIRM_CONNECT_SUCCESS',
  'PASSWORD_RESET_CONFIRM_CONNECT_ERRORED'
);

export type SignupFormFetchAction = ConnectiveAction<
  [
    'SIGNUP_FORM_FETCH_START_CONNECTING',
    'SIGNUP_FORM_FETCH_CONNECT_SUCCESS',
    'SIGNUP_FORM_FETCH_CONNECT_ERRORED',
    'SIGNUP_FORM_FETCH_RESET'
  ],
  SignupFormFetchAndUpdate['data']
>;
export const createSignupFormFetchAction = createConnectiveAction<
  SignupFormFetchAndUpdate['data']
>(
  'SIGNUP_FORM_FETCH_START_CONNECTING',
  'SIGNUP_FORM_FETCH_CONNECT_SUCCESS',
  'SIGNUP_FORM_FETCH_CONNECT_ERRORED'
);

export type SignupFormUpdateAction = ConnectiveAction<
  [
    'SIGNUP_FORM_UPDATE_START_CONNECTING',
    'SIGNUP_FORM_UPDATE_CONNECT_SUCCESS',
    'SIGNUP_FORM_UPDATE_CONNECT_ERRORED',
    'SIGNUP_FORM_UPDATE_RESET'
  ],
  SignupFormFetchAndUpdate['data']
>;
export const createSignupFormUpdateAction = createConnectiveAction<
  SignupFormFetchAndUpdate['data']
>(
  'SIGNUP_FORM_UPDATE_START_CONNECTING',
  'SIGNUP_FORM_UPDATE_CONNECT_SUCCESS',
  'SIGNUP_FORM_UPDATE_CONNECT_ERRORED'
);
