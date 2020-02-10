import { FormikProps } from 'formik';
import React, { FunctionComponent } from 'react';
import Form from 'react-bootstrap/Form';
import { FormData } from './SignupPage';

const TeamInfo: FunctionComponent<{ formik: FormikProps<FormData> }> = ({
  formik
}) => {
  return (
    <>
      <h4>队伍信息</h4>
      <Form.Group controlId="form.teamInfo.name">
        <Form.Label>队伍名称</Form.Label>
        <Form.Control
          type="text"
          isInvalid={
            !!formik.touched?.form?.teamInfo?.name &&
            !!formik.errors?.form?.teamInfo?.name
          }
          maxLength={20}
          disabled={formik.isSubmitting || formik.initialValues.confirmed}
          {...formik.getFieldProps('form.teamInfo.name')}
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
            !!formik.touched?.form?.teamInfo?.description &&
            !!formik.errors?.form?.teamInfo?.description
          }
          maxLength={50}
          disabled={formik.isSubmitting || formik.initialValues.confirmed}
          {...formik.getFieldProps('form.teamInfo.description')}
        />
        <Form.Text className="text-muted font-weight-light">
          长度不得超过50个字
        </Form.Text>
      </Form.Group>
    </>
  );
};

export default TeamInfo;
