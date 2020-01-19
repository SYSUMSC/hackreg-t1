import React, { FunctionComponent } from 'react';
import Modal from 'react-bootstrap/Modal';

type IProp = {
    title: string;
    form: React.ReactNode;
    shown: boolean;
    onHide: () => void;
};

const AccountModal: FunctionComponent<IProp> = ({ title, form, shown, onHide }) => (
    <Modal show={shown} onHide={onHide}>
        <Modal.Header closeButton={true}>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {form}
        </Modal.Body>
    </Modal>);

export default AccountModal;
