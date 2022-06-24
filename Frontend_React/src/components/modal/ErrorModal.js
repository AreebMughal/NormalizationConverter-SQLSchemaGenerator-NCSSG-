import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import './Modal.css';

function ErrorModal(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show)
    }, [props]);

    const handleClose = () => {
        props.setShow()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton closeVariant='white' className='my-modal-header modal-danger'>
                    <Modal.Title className=''>Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre>
                        {props.message}
                    </pre>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ErrorModal;