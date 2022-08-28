import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {getDownloadURL, ref} from "firebase/storage";
import {firebaseStorage} from "../../firebase/connectFirebase";
import './LoadImage.css';
import { saveAs } from 'file-saver'

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
            await getDownloadURL(reference).then((url) => {
                seturl(url);
                console.log(url);
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                // Or inserted into an <img> element
                const img = document.getElementById('myimg');
                img.setAttribute('src', url);
            })

        }
        func();
    }, []);
    const imgDownloadClickHandler = (e) => {
        // const element = document.createElement("a");
        // element.href = url
        // console.log(' URL ', element.href)
        // element.download = "pic.png";
        // document.body.appendChild(element);
        // element.click();


    }
    const saveFile = () => {
        saveAs(
            url,
            "example.png"
        );
    };

// originally forked from https://codepen.io/kkick/pen/oWZMov
    return (
        <>
            <Modal show={show} fullscreen={true} onHide={() => props.setShow(false)}>
                <Modal.Header className='bg-secondary' closeButton style={{height: '3.5rem'}}>
                    <Modal.Title className='text-white' style={{width: '60%'}}>
                        {props.title}
                    </Modal.Title>
                    <div style={{width: '40%'}}>
                    <a
                        className='btn btn-sm __btn-rm-download btn-outline-dark ps-3 pe-3 float-end me-5 text-white'
                        // onClick={imgDownloadClickHandler}
                        onClick={saveFile}
                        // href={url}
                        // download={true}
                    >
                        Download Image (*.png)
                    </a>

                    </div>
                </Modal.Header>
                <Modal.Body>
                    <img src={url} id={'myimg'} alt={'not found'} className='image'/>
                </Modal.Body>
                {/*<Modal.Footer>*/}
                {/*    <button className='btn btn-sm btn-primary'>Download</button>*/}
                {/*</Modal.Footer>*/}
            </Modal>
        </>
    );
}

export default ImageModal;