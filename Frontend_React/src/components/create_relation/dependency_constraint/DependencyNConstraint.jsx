import React, {useEffect, useState} from "react";
import ConstraintButtons from "./ConstraintButtons";
import AddDependency from "./AddDependency";
import Dependency from "./Dependency";

const DependencyNConstraint = (props) => {
    const [inputBoxes, setInputBoxes] = useState([]);
    const inputBoxIndex = props.currentIndex;
    const inputBox = inputBoxes[inputBoxIndex];

    useEffect(() => {
        setInputBoxes(props.inputBoxes);
    }, [props.inputBoxes])

    function updateState(newInputBoxes) {
        setInputBoxes(newInputBoxes);
        props.updateInputBoxes(newInputBoxes);
    }

    const getAttribute = () => {
        const attributeName = inputBoxes[inputBoxIndex] !== undefined ? inputBoxes[inputBoxIndex].value.trim() : '';
        return attributeName.length !== 0 ? attributeName : 'Attribute';
    }

    const updateCurrentInputBox = (newInputBox) => {
        const newInputBoxes = [...inputBoxes];
        newInputBoxes[inputBoxIndex] = {...newInputBoxes[inputBoxIndex]};
        newInputBoxes[inputBoxIndex] = newInputBox;
        updateState(newInputBoxes);
    }

    return (
        <div className=" col-lg-4 col-md-8 col-sm-12">
            <div className="card mycard mt-3 ms-2">
                <div className="card-header">
                    Step-2: Define Attribute Constraint and Dependency
                </div>
                <div className="card-body drawing-tool-bg-color">
                    <h5 className="card-title text-center attr">{getAttribute()}</h5>
                    <ConstraintButtons
                        inputBox={inputBox}
                        inputBoxes={inputBoxes}
                        updateState={updateState}
                        updateCurrentInputBox={updateCurrentInputBox}
                        removeAttribute={props.removeAttribute}
                    />
                    <span className="">Set Dependency:</span> <br/>
                    {(inputBox !== undefined) ? inputBox.dependency.map((dep, i) =>
                        <Dependency
                            key={i}
                            depIndex={i}
                            inputBoxes={inputBoxes}
                            inputBox={inputBox}
                            updateCurrentInputBox={updateCurrentInputBox}
                            inputBoxIndex={inputBoxIndex}
                            attributeName={getAttribute()}
                        />
                    ) : ''}
                </div>
                <AddDependency
                    inputBox={inputBox}
                    updateCurrentInputBox={updateCurrentInputBox}
                />
            </div>
        </div>
    );
}

export default DependencyNConstraint;