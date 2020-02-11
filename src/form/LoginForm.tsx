import { withFormik, FormikProps } from 'formik';
import React, { FC, useRef, MutableRefObject } from 'react';
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

type LoginFormValues = {
  email: string;
  password: string;
};

type OwnProps = {
  showPasswordResetRequestModal: MutableRefObject<(() => void) | undefined>;
};

type DispatchProps = {
  submitFormAction: (values: LoginFormValues) => void;
  hideCurrentModal: () => void;
};

type StateProps = OwnProps & StateType['userLogin'];

type Props = FormikProps<LoginFormValues> & DispatchProps & StateProps;

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
  const submitting = connectStatus.type === 'CONNECTING';
  const errorMsg =
    connectStatus.type === 'ERRORED' ? connectStatus.message : null;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>邮箱地址</Form.Label>
        <Form.Control
          type="email"
          isInvalid={!!touched.email && (!!errors.email || !!errorMsg)}
          disabled={submitting}
          maxLength={30}
          {...getFieldProps('email')}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>密码</Form.Label>
        <Form.Control
          type="password"
          isInvalid={!!touched.password && (!!errors.password || !!errorMsg)}
          maxLength={30}
          disabled={submitting}
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
        disabled={submitting}
      >
        {submitting ? (
          <Spinner as="span" animation="border" size="sm" />
        ) : (
          '登录'
        )}
      </Button>
      <Overlay
        show={!!errorMsg && !submitting}
        target={errorMsgTarget.current}
        placement="top"
      >
        <Tooltip id="loginFormErrorMsg">{errorMsg}</Tooltip>
      </Overlay>
    </Form>
  );
};

const mapStateToProps = (state: StateType, ownProps: OwnProps): StateProps => ({
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
          fetch('/auth/login', {
            // TODO: change it to /backend/auth
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Accept: 'application/json'
            },
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify(values)
          }),
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
  StateProps & DispatchProps,
  LoginFormValues
>({
  validationSchema: emailAndPasswordValidationSchema,
  mapPropsToValues: ({ form }) => ({
    email: form.email ?? '',
    password: form.password ?? ''
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
