import RelationName from "../../relation_name/RelationName";
import React, {useEffect, useState} from "react";
import TableCell from "./TableCell";
import RelationButtons from "./RelationButtons";

const CreateRelation = (props) => {
    const [inputBoxes, setInputBoxes] = useState([]);
    const ref_alert_msg = React.createRef();

    useEffect(() => {
        setInputBoxes(props.inputBoxes)
    }, [props.inputBoxes]);

    function updateCellFocus(index) {

    }

    function updateState(newInputBoxes) {
        setInputBoxes(newInputBoxes);
        props.updateInputBoxes(newInputBoxes);
    }

    const updateCellValue = (index, value) => {
        const newInputBoxes = [...inputBoxes];
        newInputBoxes[index] = {...inputBoxes[index]};
        newInputBoxes[index].value = value;
        updateState(newInputBoxes);
    }

    const addCell = (cellObject) => {
        updateState([...inputBoxes, cellObject]);
    }

    const removeCell = () => {
        if (inputBoxes.length > 1) {
            props.removeAttribute(inputBoxes.length - 1);
            props.setCurrentCell(true);
        }
    }

    const resetAll = () => props.resetAll();

    const renderInputBoxes = () => {
        return (
            <div className='d-flex flex-wrap'>
                {props.inputBoxes.map((inputBox, i) => {
                    return <TableCell
                        key={i}
                        index={i}
                        // ref={cell_ref}
                        inputBoxes={inputBoxes}
                        inputBox={inputBox}
                        value={inputBox.value}
                        updateCellValue={updateCellValue}
                        updateCurrentIndex={props.updateCurrentIndex}
                        setDisableBox={props.setDisableBox}
                        currentCell={props.currentCell}
                        setCurrentCell={props.setCurrentCell}
                        ref_alert_msg={ref_alert_msg}
                    />
                })}
            </div>
        );
    }

    return (
            <div className="card ms-3 mt-3">
                <div className='card-header'>
                    <span>Step-1: Create Relation</span>
                </div>
                <div className="card-body">
                    <div className='col-12 d-flex flex-wrap'>
                        <RelationName
                            setRelationName={props.setRelationName}
                            name={props.relationName}
                            setDisableBox={props.setDisableBox}
                        />
                        <div className="col-6">
                            <span ref={ref_alert_msg} className='float-end text-danger visually-hidden'>Cannot store same attribute names</span>
                        </div>
                    </div>
                    {renderInputBoxes()}
                    <RelationButtons
                        inputBoxes={inputBoxes}
                        addCell={addCell}
                        removeCell={removeCell}
                        resetAll={resetAll}
                        setCurrentCell={props.setCurrentCell}
                    />
                </div>
            </div>

    );
}

export default CreateRelation;