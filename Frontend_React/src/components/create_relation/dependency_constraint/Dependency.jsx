import React from "react";
import AttributesMultiSelect from "./AttributesMultiSelect";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'

const Dependency = (props) => {

    const removeDependencyClickHandler = (e) => {
        const index = e.target.id;
        const inputBox = {...props.inputBox};
        inputBox.dependency = [...inputBox.dependency];
        inputBox.dependency.splice(index, 1);
        props.updateCurrentInputBox(inputBox);
    }

    return (
        <div className="d-flex mt-2">
            <div className="attribute-multi-select me-2">
                <AttributesMultiSelect
                    key={1}
                    inputBoxes={props.inputBoxes}
                    updateCurrentInputBox={props.updateCurrentInputBox}
                    depIndex={props.depIndex}
                    inputBox={props.inputBox}
                    inputBoxIndex={props.inputBoxIndex}
                />
            </div>
            <div className="attribute-name mt-1">
                <FontAwesomeIcon icon={faArrowRight} className="me-1"/>
                <span className="me-2 mb-5">{props.attributeName}</span>
                <button
                    className='btn btn-sm btn-danger text-white btn-style'
                    id={props.depIndex}
                    onClick={removeDependencyClickHandler}
                >
                    -
                </button>
            </div>
        </div>

    );
}

export default Dependency;