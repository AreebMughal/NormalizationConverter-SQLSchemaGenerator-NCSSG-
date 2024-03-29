import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {getDownloadURL, ref} from "firebase/storage";
import {firebaseStorage} from "../../firebase/connectFirebase";
import './LoadImage.css';
import {saveAs} from 'file-saver'

const ImageModal = (props) => {

    const [show, setShow] = useState(false);
    const [url, setUrl] = useState();
    const [imgName, setImageName] = useState('');

    const getImageName = (url) => {
        const urlArray = props.url.split('/');
        return urlArray[urlArray.length - 1];
    }

    useEffect(() => {
        setShow(props.show);
        setUrl(props.url);
        setImageName(getImageName(props.url));
    }, [props.show, props.url])


    /*const getFirebaseImage = async () => {
        const reference = ref(firebaseStorage, props.imgName);
        await getDownloadURL(reference).then((url) => {
            setUrl(url);
            console.log(url);
        });
    }*/

    const saveFile = () => {
        saveAs(
            url,
            imgName + '.png'
        );
    };

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
                            onClick={saveFile}
                        >
                            Download Image (*.png)
                        </button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <img src={url} id={'myimg'} alt={'not found'} className='image'/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ImageModal;