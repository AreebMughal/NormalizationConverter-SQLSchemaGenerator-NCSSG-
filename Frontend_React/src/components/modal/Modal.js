import React, {useState} from "react";
import {FaRegQuestionCircle} from "react-icons/fa";
import {Modal} from "react-bootstrap";
import {dataTypeInfo} from "../../store/dataTypes";
import './Modal.css';

function PopupModal({dataType}) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }
    const getDataTypeInfo = () => {
        return dataTypeInfo[dataType];
    }

    return (
        <>
            <FaRegQuestionCircle className='ms-1' onClick={handleShow}/>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton className='my-modal-header bg-info '>
                    <Modal.Title className='my-modal-title'>Data Type: {dataType}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{getDataTypeInfo()}</Modal.Body>
            </Modal>
        </>
    );
}

export default PopupModal;