import React, { FunctionComponent } from 'react';
import Modal from 'react-bootstrap/Modal';

type IProp = {
    title: string;
    children: React.ReactNode;
    shown: boolean;
    onHide: () => void;
};

const FormModal: FunctionComponent<IProp> = ({ title, children, shown, onHide }) => (
    <Modal show={shown} onHide={onHide} backdrop="static">
        <Modal.Header closeButton={true}>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
    </Modal>);

export default FormModal;
