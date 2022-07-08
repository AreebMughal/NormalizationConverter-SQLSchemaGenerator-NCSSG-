import React from "react";
import {get_inputBoxes} from "../../../store/inputBoxes_dataStore";
import PreliminaryCheck from "./PreliminaryCheck";

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
        console.log(get_inputBoxes())
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
                    setVisible={props.setVisible}
                    setList={props.setList}
                    setMsg={props.setMsg}
                    setShowNavbarContent={props.setShowNavbarContent}
                />
                <button
                    className='btn btn-sm btn-info ms-2 text-white'
                    onClick={relationalMappingClickHandler}
                >
                    View Diagram
                </button>
            </div>
        </div>
    );
}

export default RelationButtons;