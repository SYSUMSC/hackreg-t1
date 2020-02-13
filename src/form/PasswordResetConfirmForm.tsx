import { FormikProps, withFormik } from 'formik';
import React, { FC, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';
import { StateType } from '../redux/Store';
import { bindActionCreators, Dispatch } from 'redux';
import { createPasswordResetConfirmAction } from '../redux/action/connective.action';
import { passwordResetValidationSchema } from '../shared/ValidationSchema';
import { connect } from 'react-redux';
import fetch from 'cross-fetch';

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
  const submitting = connectStatus.type === 'CONNECTING';
  const success = connectStatus.type === 'SUCCESS';
  const errorMsg =
    connectStatus.type === 'ERRORED' ? connectStatus.message : null;
  return (
    <Form onSubmit={handleSubmit}>
      {!success ? null : (
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
          isInvalid={!!touched.password && (!!errors.password || !!errorMsg)}
          maxLength={30}
          disabled={submitting || success}
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
            (!!errors.confirmPassword || !!errorMsg)
          }
          maxLength={30}
          disabled={submitting || success}
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
        disabled={submitting || success}
      >
        {submitting ? <Spinner animation="border" size="sm" /> : '确认'}
      </Button>
      <Overlay
        show={!!errorMsg && !submitting}
        target={errorMsgTarget.current}
        placement="top"
      >
        <Tooltip id="passwordResetConfirmFormErrorMsg">{errorMsg}</Tooltip>
      </Overlay>
    </Form>
  );
};

const mapStateToProps = (state: StateType, ownProps: OwnProps): StateProps => ({
  ...state.passwordResetConfirm,
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      submitFormAction: (values: PasswordResetConfirmFormValues) =>
        createPasswordResetConfirmAction(
          () =>
            fetch('/auth/confirm', {
              // TODO: change it to /backend/auth
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
    },
    dispatch
  );

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
