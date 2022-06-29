import React, {useEffect, useState} from "react";
import {FaRegQuestionCircle} from "react-icons/fa";
import {Modal} from "react-bootstrap";
import './Modal.css';

function DownloadModal(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show)
    }, [props]);

    const handleClose = () => {
        props.setShow(false)
    }
    const downloadClickHandler = (e) => {
        const element = document.createElement("a");
        const file = new Blob([props], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton className='my-modal-header bg-primary '>
                    <Modal.Title className='my-modal-title text-white'>Download Sql Script</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Thank you for using our system. <br/>
                    Click the Download button to download the Generated Sql file "dump_schema.sql"
                </Modal.Body>
                <Modal.Footer className="float-right pt-1 pb-1">
                    {/*<a className='btn btn-primary btn-sm' href='../../../../Backend_Flask/dump_schema.sql' download onClick={downloadClickHandler}>Download</a>*/}
                    <a className='btn btn-primary btn-sm' href='#' onClick={downloadClickHandler}>Download</a>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DownloadModal;