import React, {useEffect, useState} from "react";
import ImageLoader from "../full_page_loader/ImageLoader";
import ErrorModal from "../modal/ErrorModal";
import ImageModal from "./ImageModal";
import axios from "axios";
import my_data from "../../store/data";

const RelationalMapping = (props) => {
    const [relMapModal, setRelMapModal] = useState(false);
    const [relMapLoader, setRelMapLoader] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!relMapModal || !visibility) {
            props.setIsRelMapTrigger(false);
        }
    }, [relMapModal, visibility]);

    useEffect(() => {
        if (props.isRelMapTrigger)
            getRelationalMapping();
    }, [props])

    function getRelationalMapping() {
        console.log('RelationalMapping ', props.url)
        setRelMapLoader(true);
        axios.post(props.url, {
            inputBoxes: my_data.getRawState().inputBoxes,
            relationName: my_data.getRawState().relationName
        })
            .then(res => {
                // console.log(res.data);
                if (res.data !== 0) {
                    setRelMapModal(true);
                    setRelMapLoader(false);
                } else {
                    setRelMapLoader(false);
                    setError('Error! There is some error in Flask Server');
                    setVisibility(true);
                }
            }).catch(err => {
            console.log(err);
            setRelMapLoader(false);
            setError(err.toString());
            setVisibility(true);
        });
    }
    return (
        <>
            {relMapLoader && <ImageLoader loading={relMapLoader} message={<span>Creating Relational Mapping <br/>
                    Please wait...</span>}/>}
            {visibility &&
            <ErrorModal
                show={visibility}
                message={error}
                setShow={() => setVisibility(false)}
            />
            }
            <ImageModal
                // imgName='/sdfsd.png'
                url={props.url}
                show={relMapModal}
                setShow={setRelMapModal}
                title={props.title}

            />
        </>
    );
}

export default RelationalMapping;