import my_data from "../../store/data";
import '../../assets/css/relation.css';

import {checkRelation, handleSizeChange} from "../../assets/js/relationScript";

function Relation() {
    const inputBoxes = my_data.getRawState().inputBoxes;
    const relationName = my_data.getRawState().relationName;

    function getRelationClassName(inputBox) {
        let classname = 'inputBox mt-2 '
        if (inputBox.primary && inputBox.multiValue)
            classname += 'ib-underline ib-dash';
        else if (inputBox.multiValue)
            classname += 'ib-dash';
        else if (inputBox.primary)
            classname += 'ib-underline';
        return classname;
    }

    return (
        <div className="relation">
            {checkRelation(inputBoxes) ?
                <div className="card">
                    <div className="card-header card-relation">
                        Relation: <span className='ms-1 fw-bold'>{relationName}</span>
                    </div>
                    <div className="card-body">
                        {inputBoxes.map((inputBox, i) => {
                            if (inputBox.value.toString().trim() !== '')
                                return (
                                    <input key={i} className={getRelationClassName(inputBox)} type="text" id={"r-" + i}
                                           readOnly
                                           autoFocus
                                           value={inputBox.value}
                                           onFocus={handleSizeChange}
                                    />
                                )
                            return ''
                        })
                        }
                    </div>
                </div> :
                // <h4 className="">No Relation Found</h4>
                <div className="alert alert-danger">
                    <h5 className="">No Relation Found</h5>
                </div>
            }

        </div>
    );
}

export default Relation;