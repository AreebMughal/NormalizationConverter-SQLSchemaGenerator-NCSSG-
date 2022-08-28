import React, {useEffect, useState} from "react";
import ImageLoader from "../full_page_loader/ImageLoader";
import ErrorModal from "../modal/ErrorModal";
import ImageModal from "./ImageModal";

const RelationalMapping = (props) => {
    const [relMapModal, setRelMapModal] = useState(false);
    const [relMapLoader, setRelMapLoader] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setRelMapModal(props.relMapModal);
        setRelMapLoader(props.relMapLoader);
        setVisibility(props.visibility);
        setError(props.error);
    }, [props]);

    return (
        <>
            {relMapLoader && <ImageLoader loading={relMapLoader} message={<span>Creating Relational Mapping <br/>
                    Please wait...</span>}/>}
            {visibility &&
            <ErrorModal
                show={visibility}
                message={error}
                setShow={() => props.setVisibility(false)}
            />
            }
            <ImageModal
                imgName='/1NF.png'
                show={relMapModal}
                setShow={props.setRelMapModal}
                title={props.title}
            />
        </>
    );
}

export default RelationalMapping;