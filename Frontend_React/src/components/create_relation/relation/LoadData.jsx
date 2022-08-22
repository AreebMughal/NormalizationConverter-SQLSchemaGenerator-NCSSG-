import axios from "axios";
import my_data from "../../../store/data";
import React from "react";


const LoadData = (props) => {

    const saveDataClickHandler = (e) => {
        axios.post('http://127.0.0.1:5000/loadData', )
    }

    return (
        <input
            type="file"
            className='btn btn-sm btn-secondary ms-2'
            // onClick={saveDataClickHandler}
        >
            Load Work
        </input>
    );

}

export default LoadData;