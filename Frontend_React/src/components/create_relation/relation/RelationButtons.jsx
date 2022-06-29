import React from "react";
import my_data from "../../../store/data";
import {inputBoxes_data} from "../../../store/inputBoxes_dataStore";

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
        // props.setCurrentCell(0);
    }

    const resetAllClickHandler = (e) => {
        props.resetAll();
    }

    const relationalMappingClickHandler = (e) => {
        let inputBoxes = inputBoxes_data.getRawState().inputBoxes;
        console.log(inputBoxes)

        const  newInputBoxes = inputBoxes.map((input, index) => input.dependency.map((dep, i) => {
                const list = dep.map(id => inputBoxes.filter(inputBox => id === inputBox.id)[0].value);
                const newInputBox = {...inputBoxes[index]}
                newInputBox.dependency = [...newInputBox.dependency];
                newInputBox.dependency[i] = list;
                return newInputBox;
            })[0]
        );
        console.log(newInputBoxes)
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
            <button
                className='btn btn-sm btn-info ms-2 float-end text-white fw-bold'
                onClick={relationalMappingClickHandler}
            >
                View Relational Mapping
            </button>
        </div>
    );
}

export default RelationButtons;