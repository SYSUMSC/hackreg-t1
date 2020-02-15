import { withFormik, FormikProps } from 'formik';
import React, { FC, useRef, RefObject } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { StateType } from '../redux/Store';
import { createUserLoginAction } from '../redux/action/connective.action';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { Action } from 'redux';
import { emailAndPasswordValidationSchema } from '../shared/ValidationSchema';
import { ThunkDispatch } from 'redux-thunk';
import fetch from 'cross-fetch';

type LoginFormValues = {
  email: string;
  password: string;
};

type OwnProps = {
  showPasswordResetRequestModal: RefObject<(() => void) | undefined>;
};

type DispatchProps = {
  submitFormAction: (values: LoginFormValues) => void;
  hideCurrentModal: () => void;
};

type StateProps = StateType['userLogin'];

type Props = FormikProps<LoginFormValues> &
  DispatchProps &
  StateProps &
  OwnProps;

const LoginFormContent: FC<Props> = ({
  handleSubmit,
  showPasswordResetRequestModal,
  hideCurrentModal,
  touched,
  errors,
  getFieldProps,
  connectStatus
}) => {
  // FIXME: https://github.com/react-bootstrap/react-bootstrap/issues/4706
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorMsgTarget = useRef<any>(null);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>邮箱地址</Form.Label>
        <Form.Control
          type="email"
          isInvalid={
            !!touched.email &&
            (!!errors.email || connectStatus.type === 'ERRORED')
          }
          disabled={connectStatus.type === 'CONNECTING'}
          maxLength={30}
          {...getFieldProps('email')}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>密码</Form.Label>
        <Form.Control
          type="password"
          isInvalid={
            !!touched.password &&
            (!!errors.password || connectStatus.type === 'ERRORED')
          }
          maxLength={30}
          disabled={connectStatus.type === 'CONNECTING'}
          {...getFieldProps('password')}
        />
      </Form.Group>
      <Button
        variant="outline-primary"
        onClick={() => {
          showPasswordResetRequestModal.current!();
          hideCurrentModal();
        }}
      >
        重置密码
      </Button>
      <Button
        type="submit"
        variant="outline-primary"
        className="float-right"
        ref={errorMsgTarget}
        disabled={connectStatus.type === 'CONNECTING'}
      >
        {connectStatus.type === 'CONNECTING' ? (
          <Spinner as="span" animation="border" size="sm" />
        ) : (
          '登录'
        )}
      </Button>
      <Overlay
        show={connectStatus.type === 'ERRORED'}
        target={errorMsgTarget.current}
        placement="top"
      >
        <Tooltip id="loginFormErrorMsg">
          {connectStatus.type === 'ERRORED' ? connectStatus.message : null}
        </Tooltip>
      </Overlay>
    </Form>
  );
};

const mapStateToProps = (
  state: StateType,
  ownProps: OwnProps
): StateProps & OwnProps => ({
  ...state.userLogin,
  ...ownProps
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, {}, Action>
): DispatchProps => ({
  submitFormAction: (values: LoginFormValues) =>
    dispatch(
      createUserLoginAction(
        () =>
          fetch(
            `${
              process.env.NODE_ENV === 'production' ? '/backend' : ''
            }/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json'
              },
              mode: 'same-origin',
              credentials: 'same-origin',
              body: JSON.stringify(values)
            }
          ),
        values,
        dispatch => {
          dispatch({
            type: 'USER_LOGIN_RESET'
          });
          dispatch({
            type: 'USER_LOGIN_HIDE_MODAL'
          });
          dispatch({
            type: 'LOCAL_DATA_SET',
            payload: {
              email: values.email,
              expireTime: new Date().getTime() + 43200000
            }
          });
        }
      )
    ),
  hideCurrentModal: () => {
    dispatch({
      type: 'USER_LOGIN_RESET'
    });
    dispatch({
      type: 'USER_LOGIN_HIDE_MODAL'
    });
  }
});

const loginFormContentWithFormik = withFormik<
  StateProps & DispatchProps & OwnProps,
  LoginFormValues
>({
  validationSchema: emailAndPasswordValidationSchema,
  mapPropsToValues: ({ form }) => ({
    ...(form ?? {
      email: '',
      password: ''
    })
  }),
  handleSubmit: (values, { props }) => {
    props.submitFormAction(values);
  }
})(LoginFormContent);

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(loginFormContentWithFormik);

export default LoginForm;
