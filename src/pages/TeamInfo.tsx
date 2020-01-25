import { useFormikContext } from 'formik';
import React, { FunctionComponent } from 'react';
import Form from 'react-bootstrap/Form';
import { SignupFormValues } from './SignupPage';

const TeamInfo: FunctionComponent = () => {
    const { touched, errors, getFieldProps } = useFormikContext<SignupFormValues>();
    return (<>
        <h4>队伍信息</h4>
        <Form.Group controlId="teamInfo.name">
            <Form.Label>队伍名称</Form.Label>
            <Form.Control
                type="text" // TODO: should add isInvalid?
                isValid={touched.teamInfo?.name && !errors.teamInfo?.name}
                maxLength={20}
                {...getFieldProps(`teamInfo.name`)}
            />
            <Form.Text className="text-muted font-weight-light">
                长度不得超过20个字
            </Form.Text>
        </Form.Group>
        <Form.Group controlId="teamInfo.description">
            <Form.Label>队伍介绍</Form.Label>
            <Form.Control
                as="textarea"
                rows="5"
                isValid={touched.teamInfo?.description && !errors.teamInfo?.description}
                maxLength={50}
                {...getFieldProps(`teamInfo.description`)}
            />
            <Form.Text className="text-muted font-weight-light">
                长度不得超过50个字
            </Form.Text>
        </Form.Group>
    </>);
};

export default TeamInfo;
