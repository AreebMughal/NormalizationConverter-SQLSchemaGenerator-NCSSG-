import {CSSProperties, useEffect, useState} from "react";
import './loader.css';
import {BarLoader, PulseLoader} from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    padding: '0',
    borderColor: "red",
};

function GeneralLoader(props) {
    let [color, setColor] = useState("#a0f4ff");
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(props.loading);
    }, [props.loading]);

    return (
        <div id="cover" className='m-0 p-0'>
            <div className="sweet-loading general-loader m-0 p-0">
                <span className='text-white general-loader-text'>
                    {props.message}
                </span>
                <BarLoader color={color} loading={loading} cssOverride={override} width={200} className='mt-3'/>
            </div>
        </div>
    );
}

export default GeneralLoader;