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
import { createPasswordResetRequestAction } from '../redux/action/connective.action';
import { emailValidationSchema } from '../shared/ValidationSchema';
import { connect } from 'react-redux';

type PasswordResetRequestFormValues = {
  email: string;
};

type DispatchProps = {
  submitFormAction: (values: PasswordResetRequestFormValues) => void;
};

type StateProps = StateType['passwordResetRequest'];

type Props = FormikProps<PasswordResetRequestFormValues> &
  DispatchProps &
  StateProps;

const PasswordResetRequestFormContent: FC<Props> = ({
  handleSubmit,
  touched,
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
        <Alert variant="success">
          重置密码的邮件已发送，请注意查收。若超过五分钟未收到，请重试。
        </Alert>
      )}
      <Form.Group controlId="email">
        <Form.Label>邮箱地址</Form.Label>
        <Form.Control
          type="email"
          isInvalid={!!touched.email && (!!errors.email || !!errorMsg)}
          disabled={submitting || success}
          maxLength={30}
          {...getFieldProps('email')}
        />
        <Form.Text className="text-muted font-weight-light">
          输入需要找回的密码对应的邮箱
        </Form.Text>
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="float-right"
        ref={errorMsgTarget}
        disabled={submitting || success}
      >
        {submitting ? <Spinner animation="border" size="sm" /> : '发送验证邮件'}
      </Button>
      <Overlay
        show={!!errorMsg && !submitting}
        target={errorMsgTarget.current}
        placement="top"
      >
        <Tooltip id="passwordResetRequestFormErrorMsg">{errorMsg}</Tooltip>
      </Overlay>
    </Form>
  );
};

const mapStateToProps = (state: StateType): StateProps => ({
  ...state.passwordResetRequest
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      submitFormAction: (values: PasswordResetRequestFormValues) =>
        createPasswordResetRequestAction(
          () =>
            fetch('/auth/reset', {
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
          values
        )
    },
    dispatch
  );

const passwordResetRequestFormContentWithFormik = withFormik<
  StateProps & DispatchProps,
  PasswordResetRequestFormValues
>({
  validationSchema: emailValidationSchema,
  mapPropsToValues: ({ form }) => ({
    email: form.email ?? ''
  }),
  handleSubmit: (values, { props }) => {
    props.submitFormAction(values);
  }
})(PasswordResetRequestFormContent);

const PasswordResetRequestForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(passwordResetRequestFormContentWithFormik);

export default PasswordResetRequestForm;
