import React from "react";
import PreliminaryCheck from "./PreliminaryCheck";
import axios from "axios";
import my_data from "../../../store/data";
import SaveData from "./SaveData";
import LoadData from "./LoadData";

const RelationButtons = (props) => {

    const addCellClickHandler = (e) => {
        props.addCell({
            id: props.inputBoxes[props.inputBoxes.length - 1].id + 1,
            value: '',
            width: 90,
            dependency: [[]],
            primary: false,
            multiValue: false,
        });
    }

    const deleteCellClickHandler = (e) => {
        props.removeCell();
    }

    const resetAllClickHandler = (e) => {
        props.resetAll();
    }

    const relationalMappingClickHandler = (e) => {
        axios.post('http://127.0.0.1:5000/relationalMapping',
            {inputBoxes: my_data.getRawState().inputBoxes, relationName: my_data.getRawState().relationName})
            .then(res => {
                console.log(res);

            }).catch(error => {
            alert('Server is not running => ' + error)
        });
    }

    return (
        <div className="buttons ms-2 mt-1">
            <button
                className='btn btn-sm btn-primary text-white btn-style me-1'
                onClick={addCellClickHandler}
            >
                ＋
            </button>
            <button
                className='btn btn-sm btn-danger text-white btn-style'
                onClick={deleteCellClickHandler}
            >
                -
            </button>
            <button
                className='btn btn-sm btn-secondary ms-2'
                onClick={resetAllClickHandler}
            >
                Reset
            </button>
            <div className="float-end">
                <PreliminaryCheck
                    onPreliminaryCheckClick={props.onPreliminaryCheckClick}
                    setShowNavbarContent={props.setShowNavbarContent}
                />
                <button
                    className='btn btn-sm btn-info ms-2 text-white'
                    onClick={relationalMappingClickHandler}
                >
                    View Diagram
                </button>
                <SaveData />
                <LoadData
                    setIsLoadWork={props.setIsLoadWork}
                />
            </div>
        </div>
    );
}

export default RelationButtons;