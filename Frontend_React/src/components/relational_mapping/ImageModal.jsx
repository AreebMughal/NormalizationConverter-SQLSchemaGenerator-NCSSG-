import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {getDownloadURL, ref} from "firebase/storage";
import {firebaseStorage} from "../../firebase/connectFirebase";
import './LoadImage.css';

const ImageModal = (props) => {

    const [show, setShow] = useState(false);
    const [url, seturl] = useState();

    useEffect(() => {
        const func = async () => {
            // const storage = getStorage();
            const reference = ref(firebaseStorage, props.imgName);
            await getDownloadURL(reference).then((x) => {
                seturl(x);
                console.log(x);
            })
        }
        func();
    }, []);

    function handleShow(v) {
        setShow(true);
    }

    return (
        <>
            <Button className="me-2 mb-2" onClick={() => handleShow()}>
                Full screen
            </Button>
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={url} alt={'not found'} className='image'/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ImageModal;