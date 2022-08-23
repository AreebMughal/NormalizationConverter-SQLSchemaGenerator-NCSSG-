import axios from "axios";
import my_data from "../../../store/data";
import React from "react";


const SaveData = (props) => {

    const saveDataClickHandler = (e) => {
        const data = my_data.getRawState();
        // const relationName = my_data.getRawState()['relation']
        console.log();
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(data)], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "your_work.txt";
        document.body.appendChild(element);
        element.click();
    }

    return (
        <button
            className='btn btn-sm btn-secondary ms-2'
            onClick={saveDataClickHandler}
        >
            Save Work
        </button>
    );

}

export default SaveData;