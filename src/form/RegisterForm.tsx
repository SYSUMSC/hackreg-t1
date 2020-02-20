import { FormikProps, withFormik } from 'formik';
import React, { FC, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { StateType } from '../redux/Store';
import { Action } from 'redux';
import { emailAndPasswordValidationSchema } from '../shared/ValidationSchema';
import { connect } from 'react-redux';
import { createUserRegisterAction } from '../redux/action/connective.action';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import fetch from 'cross-fetch';
import { ThunkDispatch } from 'redux-thunk';

type RegisterFormValues = {
  email: string;
  password: string;
};

type DispatchProps = {
  submitFormAction: (values: RegisterFormValues) => void;
};

type StateProps = StateType['userRegister'];

type Props = FormikProps<RegisterFormValues> & StateProps & DispatchProps;

const RegisterFormContent: FC<Props> = ({
  handleSubmit,
  touched,
  errors,
  getFieldProps,
  connectStatus
}) => {
  // FIXME: https://github.com/react-bootstrap/react-bootstrap/issues/4706
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorMsgTarget = useRef<any>(null);
  return (
    <>
      <Alert variant="info">
        一个队伍的报名只需要一个账号完成，我们推荐由队长注册并管理账号。
      </Alert>
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
          <Form.Text className="text-muted font-weight-light">
            重要信息，请确保填写正确
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>密码</Form.Label>
          <Form.Control
            type="password"
            isInvalid={
              !!touched.password &&
              (!!errors.password || connectStatus.type === 'ERRORED')
            }
            disabled={connectStatus.type === 'CONNECTING'}
            maxLength={30}
            {...getFieldProps('password')}
          />
          <Form.Text className="text-muted font-weight-light">
            长度在8到30字之间，只能包含英文字母、数字或者一些特殊符号如#@!等
          </Form.Text>
        </Form.Group>
        <Button
          variant="outline-primary"
          className="float-right"
          type="submit"
          ref={errorMsgTarget}
          disabled={connectStatus.type === 'CONNECTING'}
        >
          {connectStatus.type === 'CONNECTING' ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            '注册'
          )}
        </Button>
        <Overlay
          show={connectStatus.type === 'ERRORED'}
          target={errorMsgTarget.current}
          placement="top"
        >
          <Tooltip id="registerFormErrorMsg">
            {connectStatus.type === 'ERRORED' ? connectStatus.message : null}
          </Tooltip>
        </Overlay>
      </Form>
    </>
  );
};

const mapStateToProps = (state: StateType): StateProps => ({
  ...state.userLogin
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, {}, Action>
): DispatchProps => ({
  submitFormAction: (values: RegisterFormValues) =>
    dispatch(
      createUserRegisterAction(
        () =>
          fetch('/backend/auth/register', {
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
            type: 'USER_REGISTER_RESET'
          });
          dispatch({
            type: 'USER_REGISTER_HIDE_MODAL'
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
    )
});

const registerFormContentWithFormik = withFormik<
  StateProps & DispatchProps,
  RegisterFormValues
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
})(RegisterFormContent);

const RegisterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(registerFormContentWithFormik);

export default RegisterForm;
