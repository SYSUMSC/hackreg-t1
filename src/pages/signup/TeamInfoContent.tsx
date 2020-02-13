import React, { FC } from 'react';
import { FormikProps } from 'formik';
import Form from 'react-bootstrap/Form';
import { SignupFormData } from '../../redux/type/signupForm.type';

type TeamInfoContentProps = {
  submitting: boolean;
} & FormikProps<SignupFormData>;
const TeamInfoContent: FC<TeamInfoContentProps> = ({
  submitting,
  values,
  errors,
  touched,
  getFieldProps
}) => (
  <>
    <h4>队伍信息</h4>
    <Form.Group controlId="form.teamInfo.name">
      <Form.Label>队伍名称</Form.Label>
      <Form.Control
        type="text"
        isInvalid={
          !!touched?.form?.teamInfo?.name && !!errors?.form?.teamInfo?.name
        }
        maxLength={20}
        disabled={submitting || values.confirmed}
        {...getFieldProps('form.teamInfo.name')}
      />
      <Form.Text className="text-muted font-weight-light">
        长度不得超过20个字
      </Form.Text>
    </Form.Group>
    <Form.Group controlId="form.teamInfo.description">
      <Form.Label>队伍介绍</Form.Label>
      <Form.Control
        as="textarea"
        rows="5"
        isInvalid={
          !!touched?.form?.teamInfo?.description &&
          !!errors?.form?.teamInfo?.description
        }
        maxLength={50}
        disabled={submitting || values.confirmed}
        {...getFieldProps('form.teamInfo.description')}
      />
      <Form.Text className="text-muted font-weight-light">
        长度不得超过50个字
      </Form.Text>
    </Form.Group>
  </>
);

export default TeamInfoContent;
