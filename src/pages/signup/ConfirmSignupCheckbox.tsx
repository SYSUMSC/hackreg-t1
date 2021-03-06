import React, { FC } from 'react';
import { FormikProps } from 'formik';
import Form from 'react-bootstrap/Form';
import { SignupFormData } from '../../redux/type/signupForm.type';

type ConfirmSignupCheckboxProps = {
  submitting: boolean;
} & FormikProps<SignupFormData>;

const ConfirmSignupCheckbox: FC<ConfirmSignupCheckboxProps> = ({
  submitting,
  getFieldProps,
  values
}) => (
  <Form.Group id="confirmed">
    <Form.Check
      type="checkbox"
      disabled={submitting}
      label="确认报名并锁定表单"
      {...getFieldProps('confirmed')}
      checked={values.confirmed}
    />
    <Form.Text className="text-muted font-weight-light">
      选择该选项并提交表单后，报名才有效。报名结束前可以通过取消该选项并提交表单来撤销报名。
    </Form.Text>
  </Form.Group>
);

export default ConfirmSignupCheckbox;
