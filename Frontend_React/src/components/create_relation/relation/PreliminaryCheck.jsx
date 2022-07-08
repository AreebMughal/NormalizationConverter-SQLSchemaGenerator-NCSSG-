import React, {useEffect} from "react";
import my_data from "../../../store/data";

const PreliminaryCheck = (props) => {
    const {setVisible, setList, setMsg, setShowNavbarContent} = props;

    useEffect(() => {
        // const timer = setTimeout(() => setVisible(false), 5000);
        // return () => clearTimeout(timer);
    })



    return (
        <button
            className='btn btn-sm btn-primary ms-2'
            // onClick={preliminaryCheckClickHandler}
        >
            Preliminary Check to Proceed
        </button>
    );
}

export default PreliminaryCheck;