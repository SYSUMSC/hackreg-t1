import React from 'react';
import Modal from 'react-bootstrap/Modal';

const withModal = (title: string, shown: boolean, onHide: () => void, form: React.ReactNode) => (<>
    <Modal show={shown} onHide={onHide} backdrop="static">
        <Modal.Header closeButton={true}>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {form}
        </Modal.Body>
    </Modal>
</>);

export default withModal;
