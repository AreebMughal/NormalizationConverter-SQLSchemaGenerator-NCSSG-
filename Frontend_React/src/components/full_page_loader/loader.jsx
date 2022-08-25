import {CSSProperties, useEffect, useState} from "react";
import ClipLoader from "react-spinners/ClipLoader";
import './loader.css';
import {ScaleLoader} from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    padding: '0',
    borderColor: "red",
};

function Loader(props) {
    let [color, setColor] = useState("#00d2e0");
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(props.loading);
    }, [props.loading]);

    return (
        <div id="cover" className='m-0 p-0'>
            <div className="sweet-loading loader m-0 p-0">
                <span className='text-white loader-text'>
                    {props.message}
                </span>
                <ScaleLoader color={color} loading={loading} cssOverride={override} size={150}/>
            </div>
        </div>
    );
}

export default Loader;