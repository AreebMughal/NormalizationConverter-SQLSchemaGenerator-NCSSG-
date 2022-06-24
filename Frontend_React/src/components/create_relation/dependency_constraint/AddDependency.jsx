import React from "react";

const AddDependency = (props) => {
    const addDependencyClickHandler = () => {
        const inputBox = {...props.inputBox};
        inputBox.dependency = [...inputBox.dependency];
        inputBox.dependency.push([]);
        props.updateCurrentInputBox(inputBox);
    }

    return (
        <div className='drawing-tool-bg-color'>
            <button
                className='btn btn-sm btn-primary ms-3 mb-2'
                onClick={addDependencyClickHandler}
            >
                Add Dependency
            </button>
        </div>
    );
}

export default AddDependency;