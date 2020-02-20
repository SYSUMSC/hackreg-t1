import { FormikProps, withFormik } from 'formik';
import React, { FC, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';
import { StateType } from '../redux/Store';
import { Action } from 'redux';
import { createPasswordResetConfirmAction } from '../redux/action/connective.action';
import { passwordResetValidationSchema } from '../shared/ValidationSchema';
import { connect } from 'react-redux';
import fetch from 'cross-fetch';
import { ThunkDispatch } from 'redux-thunk';

type PasswordResetConfirmFormValues = {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
};

type OwnProps = {
  presetEmail: string;
  presetToken: string;
};

type DispatchProps = {
  submitFormAction: (values: PasswordResetConfirmFormValues) => void;
};

type StateProps = StateType['passwordResetConfirm'];

type Props = FormikProps<PasswordResetConfirmFormValues> &
  DispatchProps &
  StateProps &
  OwnProps;

const PasswordResetConfirmFormContent: FC<Props> = ({
  handleSubmit,
  touched,
  values,
  errors,
  getFieldProps,
  connectStatus
}) => {
  // FIXME: https://github.com/react-bootstrap/react-bootstrap/issues/4706
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorMsgTarget = useRef<any>(null);
  return (
    <Form onSubmit={handleSubmit}>
      {connectStatus.type !== 'SUCCESS' ? null : (
        <Alert variant="success">重置密码成功，页面即将刷新...</Alert>
      )}
      <Form.Group controlId="email">
        <Form.Label>邮箱地址</Form.Label>
        <Form.Control type="text" disabled={true} value={values.email} />
      </Form.Group>
      <Form.Group controlId="token">
        <Form.Label>验证码</Form.Label>
        <Form.Control type="text" disabled={true} value={values.token} />
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
          disabled={
            connectStatus.type === 'CONNECTING' ||
            connectStatus.type === 'SUCCESS'
          }
          {...getFieldProps('password')}
        />
        <Form.Text className="text-muted font-weight-light">
          输入要设置的新密码
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="confirmPassword">
        <Form.Label>确认密码</Form.Label>
        <Form.Control
          type="password"
          isInvalid={
            !!touched.confirmPassword &&
            (!!errors.confirmPassword || connectStatus.type === 'ERRORED')
          }
          maxLength={30}
          disabled={
            connectStatus.type === 'CONNECTING' ||
            connectStatus.type === 'SUCCESS'
          }
          {...getFieldProps('confirmPassword')}
        />
        <Form.Text className="text-muted font-weight-light">
          再输入一遍新密码
        </Form.Text>
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="float-right"
        ref={errorMsgTarget}
        disabled={
          connectStatus.type === 'CONNECTING' ||
          connectStatus.type === 'SUCCESS'
        }
      >
        {connectStatus.type === 'CONNECTING' ? (
          <Spinner animation="border" size="sm" />
        ) : (
          '确认'
        )}
      </Button>
      <Overlay
        show={connectStatus.type === 'ERRORED'}
        target={errorMsgTarget.current}
        placement="top"
      >
        <Tooltip id="passwordResetConfirmFormErrorMsg">
          {connectStatus.type === 'ERRORED' ? connectStatus.message : null}
        </Tooltip>
      </Overlay>
    </Form>
  );
};

const mapStateToProps = (state: StateType, ownProps: OwnProps): StateProps => ({
  ...state.passwordResetConfirm,
  ...ownProps
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, {}, Action>
): DispatchProps => ({
  submitFormAction: (values: PasswordResetConfirmFormValues) =>
    dispatch(
      createPasswordResetConfirmAction(
        () =>
          fetch('/backend/auth/confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Accept: 'application/json'
            },
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify({ ...values, confirmPassword: undefined })
          }),
        values,
        () => {
          setTimeout(() => window.location.replace('/'), 3000);
        }
      )
    )
});

const passwordResetConfirmFormContentWithFormik = withFormik<
  StateProps & DispatchProps & OwnProps,
  PasswordResetConfirmFormValues
>({
  validationSchema: passwordResetValidationSchema,
  mapPropsToValues: ({ presetEmail, presetToken, form }) => ({
    email: presetEmail,
    token: presetToken,
    password: form?.password ?? '',
    confirmPassword: form?.confirmPassword ?? ''
  }),
  handleSubmit: (values, { props }) => {
    props.submitFormAction(values);
  }
})(PasswordResetConfirmFormContent);

const PasswordResetConfirmForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(passwordResetConfirmFormContentWithFormik);

export default PasswordResetConfirmForm;
