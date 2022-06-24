import React, {Component} from "react";
import MultiSelect from "./multiSelect";


class DrawingToolDependency extends Component {
    render() {
        return (
            <div className="">
                <div className="d-flex mt-2">
                    <div className="attribute-multi-select me-2">
                        <MultiSelect
                            key={1}
                            inputBoxes={this.props.inputBoxes}
                            onChange={this.props.onChange}
                            id={this.props.id}
                            inputBoxIndex={this.props.inputBoxIndex}
                        />
                    </div>
                    <div className="attribute-name mt-1">
                        <span className="fw-bold me-2">
                            --> <span className='attr'>{this.props.attr}</span>
                        </span>
                        <button
                            className='btn btn-sm btn-danger text-white btn-style'
                            id={this.props.id}
                            onClick={this.props.onClick}
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DrawingToolDependency;