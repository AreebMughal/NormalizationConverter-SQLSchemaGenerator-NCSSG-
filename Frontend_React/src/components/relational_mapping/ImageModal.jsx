import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {getDownloadURL, ref} from "firebase/storage";
import {firebaseStorage} from "../../firebase/connectFirebase";
import './LoadImage.css';
// import { saveAs } from 'file-saver'

const ImageModal = (props) => {

    const [show, setShow] = useState(false);
    const [url, seturl] = useState();

    useEffect(() => {
        setShow(props.show);
        console.log('Img Modal', props.show);
    }, [props.show])

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
    const imgDownloadClickHandler = (e) => {
        // saveAs(url, props.imgName)
    }

// originally forked from https://codepen.io/kkick/pen/oWZMov
    return (
        <>
            <Modal show={show} fullscreen={true} onHide={() => props.setShow(false)}>
                <Modal.Header className='bg-secondary' closeButton style={{height: '3.5rem'}}>
                    <Modal.Title className='text-white' style={{width: '60%'}}>
                        {props.title}
                    </Modal.Title>
                    <div style={{width: '40%'}}>
                    <button
                        className='btn btn-sm __btn-rm-download btn-outline-dark ps-3 pe-3 float-end me-5 text-white'
                        onClick={imgDownloadClickHandler}
                    >
                        Download Image (*.png)
                    </button>

                    </div>
                </Modal.Header>
                <Modal.Body>
                    <img src={url} alt={'not found'} className='image'/>
                </Modal.Body>
                {/*<Modal.Footer>*/}
                {/*    <button className='btn btn-sm btn-primary'>Download</button>*/}
                {/*</Modal.Footer>*/}
            </Modal>
        </>
    );
}

export default ImageModal;