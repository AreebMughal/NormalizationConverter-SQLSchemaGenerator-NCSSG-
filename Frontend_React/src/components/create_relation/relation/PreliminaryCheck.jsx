import React, {useEffect} from "react";
import my_data from "../../../store/data";
import axios from "axios";

const PreliminaryCheck = (props) => {


    const preliminaryCheckClickHandler = (e) => {
        if (props.onPreliminaryCheckClick(e)) {
            axios.post('http://127.0.0.1:5000/preliminaryCheck', my_data.getRawState().inputBoxes)
                .then(res => {
                    console.log(res);
                })
            props.setShowNavbarContent(true);
        }
    }
    return (
        <button
            className='btn btn-sm btn-primary ms-2'
            onClick={preliminaryCheckClickHandler}
        >
            Preliminary Check to Proceed
        </button>
    );
}

export default PreliminaryCheck;