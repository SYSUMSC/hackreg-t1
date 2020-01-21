import React, { FunctionComponent } from 'react';
import Form from 'react-bootstrap/Form';
import FormModal from '../modal/FormModal';

type IProp = {
    shown: boolean;
    onHide: () => void;
};

const SubmitWorkForm: FunctionComponent<IProp> = ({ shown, onHide }) => (
    <FormModal shown={shown} onHide={onHide} title="提交作品">
        <Form>
            还不是时候
        </Form>
    </FormModal>);

export default SubmitWorkForm;
