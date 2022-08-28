import RelationName from "../../relation_name/RelationName";
import React from "react";
import TableCell from "./TableCell";
import RelationButtons from "./RelationButtons";
import AlertDismissible from "../../general_UI/AlertDismissible";

const CreateRelation = (props) => {
    const ref_alert_msg = React.createRef();
    const inputBoxes = props.inputBoxes;

    function updateState(newInputBoxes) {
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

    const resetAllCells = () => {
        props.updateInputBoxes([{
            id: 1,
            value: '',
            dependency: [[]],
            primary: false,
            multiValue: false,
        }]);
        props.setRelationName('');
        props.setSuggestion('');
    }

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
                        list={props.props_data.list}
                    />
                })}
            </div>
        );
    }

    return (
        <div className="card ms-3 mt-3">
            <div className='card-header'>
                <div className="d-flex flex-wrap">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <span>Step-1: Create Relation</span>
                    </div>
                    <AlertDismissible
                        visibility={props.props_data.visible}
                        alertMsg={props.props_data.errorMsg}
                        setVisible={props.props_data.setVisible}
                    />
                </div>
            </div>
            <div className="card-body">
                <div className='col-12 d-flex flex-wrap mb-3'>
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
                    resetAll={resetAllCells}
                    setCurrentCell={props.setCurrentCell}
                    onPreliminaryCheckClick={props.onPreliminaryCheckClick}
                    setShowNavbarContent={props.setShowNavbarContent}
                    setIsLoadWork={props.setIsLoadWork}
                />
            </div>
        </div>

    );
}

export default CreateRelation;