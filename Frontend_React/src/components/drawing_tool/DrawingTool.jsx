import React, {Component} from "react";
import DrawingToolDependency from "./drawingToolDependency";
import '../../assets/css/drawingTool.css';

class DrawingTool extends Component {
    render() {
        return (
            <div className="card mycard mt-3 ms-2">
                <div className="card-header">
                    Step-2: Define Attribute Constraint and Dependency
                </div>
                <div className="card-body drawing-tool-bg-color">
                    <h5 className="card-title text-center attr">Attribute</h5>
                    {this.renderDrawingToolButtons()}
                    <span className="">Set Dependency:</span> <br/>
                    {this.renderDrawingToolDependency()}
                </div>
                <div className='drawing-tool-bg-color'>
                    <button
                        className='btn btn-sm btn-primary ms-3 mb-2'
                        onClick={this.props.onClickAddDep}
                    >
                        Add Dependency
                    </button>
                </div>
            </div>
        );
    }

    renderDrawingToolButtons() {

        const {onPrimaryClick, onDeleteClick, onMultiValueClick} = this.props

        return (
            <div className="buttons mt-3">
                <div
                    id='btn-primary'
                    className="btn btn-sm ms-3 mb-3 btn-outline-primary"
                    onClick={onPrimaryClick}
                >
                    Set Primary
                </div>
                <div
                    id='btn-multi-value'
                    className="btn btn-sm ms-3 mb-3 btn-outline-info"
                    onClick={onMultiValueClick}
                >
                    Set Multi-value
                </div>
                <div
                    className="btn btn-danger btn-sm ms-3 mb-3"
                    onClick={onDeleteClick}
                >
                    Delete
                </div>
            </div>
        );
    }

    renderDrawingToolDependency() {
        const {dependencyIndex, onChangeMultiValue, inputBoxes} = this.props
        const inputBox = inputBoxes[dependencyIndex]
        return (
            <div>
                {(inputBox !== undefined) ? inputBox.dependency.map((dep, i) =>
                    <DrawingToolDependency
                        key={i}
                        inputBoxes={inputBoxes}
                        onClick={() => this.props.onClickRemoveDep(i)}
                        attr={this.getAttributeName()}
                        id={i}
                        onChange={onChangeMultiValue}
                        inputBoxIndex={dependencyIndex}
                    />
                ) : ''}
            </div>
        );
    }

    getAttributeName() {
        let name = 'Attribute'
        if (document.getElementsByClassName('attr')[0] !== undefined) {
            name = document.getElementsByClassName('attr')[0].innerHTML
        }
        return name;
    }
}

export default DrawingTool;