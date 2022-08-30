import React from "react";
import my_data from "../../../store/data";
import axios from "axios";

const PreliminaryCheck = (props) => {

    const preliminaryCheckClickHandler = (e) => {
        if (props.onPreliminaryCheckClick(e)) {
            axios.post('http://127.0.0.1:5000/preliminaryCheck', {
                inputBoxes: my_data.getRawState().inputBoxes,
                relationName: my_data.getRawState().relationName
            })
                .then(res => {
                    console.log(res);
                    props.setSuggestion(
                        <span>
                            {res.data}
                        </span>
                    );
                    props.setShowNavbarContent(true);
                })
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