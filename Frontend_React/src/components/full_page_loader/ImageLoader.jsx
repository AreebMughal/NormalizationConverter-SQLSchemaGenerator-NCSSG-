import {CSSProperties, useEffect, useState} from "react";
import './loader.css';
import {RingLoader} from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    padding: '0',
    borderColor: "red",
};

function ImageLoader(props) {
    let [color, setColor] = useState("#54f5ff");
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(props.loading);
    }, [props.loading]);

    return (
        <div id="cover" className='m-0 p-0'>
            <div className="sweet-loading ring-loader m-0 p-0">
                <span className='text-white ring-loader-text'>
                    {props.message}
                </span>
                <RingLoader color={color} loading={loading} cssOverride={override} size={100}/>
            </div>
        </div>
    );
}

export default ImageLoader;