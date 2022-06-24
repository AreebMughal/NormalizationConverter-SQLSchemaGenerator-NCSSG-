import React from "react";

const ConstraintButtons = (props) => {

    function setButtonClass(e, inputBox, type) {
        const bgColor = type === 'primary' ? 'primary' : 'info';
        if (inputBox !== undefined && inputBox[type]) {
            e.target.classList.replace(`btn-outline-${bgColor}`, `btn-${bgColor}`)
        } else {
            e.target.classList.replace(`btn-${bgColor}`, `btn-outline-${bgColor}`)
        }
    }

    function primaryBtnClickHandler(e) {
        if (!props.inputBox.multiValue) {
            const inputBox = {...props.inputBox}
            inputBox.primary = !inputBox.primary;
            props.updateCurrentInputBox(inputBox);
            setButtonClass(e, inputBox, 'primary');
        }
    }

    function multiValueBtnClickHandler(e) {
        if (!props.inputBox.primary) {
            const inputBox = {...props.inputBox}
            inputBox.multiValue = !inputBox.multiValue;
            props.updateCurrentInputBox(inputBox);
            setButtonClass(e, inputBox, 'multiValue');
        }
    }

    function deleteCellBtnClickHandler(e) {
        if (props.inputBoxes.length > 1) {
            props.removeAttribute(props.inputBoxes.indexOf(props.inputBox));
        }
    }

    return (
        <div className="buttons mt-3">
            <div
                className="btn btn-sm ms-3 mb-3 btn-outline-primary"
                onClick={primaryBtnClickHandler}
            >
                Set Primary
            </div>
            <div
                className="btn btn-sm ms-3 mb-3 btn-outline-info"
                onClick={multiValueBtnClickHandler}
            >
                Set Multi-value
            </div>
            <div
                className="btn btn-danger btn-sm ms-3 mb-3"
                onClick={deleteCellBtnClickHandler}
            >
                Delete
            </div>
        </div>
    );
}

export default ConstraintButtons;