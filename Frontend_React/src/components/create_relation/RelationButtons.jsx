import React from "react";

const RelationButtons = (props) => {
    function addCellClickHandler(e) {
        props.addCell({
            id: props.inputBoxes[props.inputBoxes.length - 1].id + 1,
            value: '',
            width: 90,
            dependency: [[]],
            primary: false,
            multiValue: false,
        });
    }

    function deleteCellClickHandler(e) {
        props.removeCell();
    }

    function resetAllClickHandler(e) {
        props.resetAll();
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
        </div>
    );
}

export default RelationButtons;