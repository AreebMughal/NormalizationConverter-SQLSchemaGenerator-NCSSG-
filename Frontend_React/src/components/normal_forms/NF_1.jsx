import my_data from "../../store/data";
import 'bootstrap'
import {checkRelation, handleSizeChange} from "../../assets/js/relationScript";
import Relation from "./relation";

function NF_1() {
    const inputBoxes = my_data.getRawState().inputBoxes

    function return1NFResult() {
        return (
            <div className='card card-1NF-result'>
                <div className="card-header">1-NF Result</div>
                <div className="card-body">
                {
                    inputBoxes.map((inputBox, i) => {
                            if (inputBox.value.toString().trim() !== '')
                                return (
                                    <input key={i} className={getClassName(inputBox)} type="text"
                                           id={"1nf-" + i}
                                           readOnly
                                           autoFocus
                                           onFocus={handleSizeChange}
                                           value={inputBox.value}
                                    />
                                )
                            return ''
                        }
                    )
                }
                </div>
            </div>
        );
    }

    function checkMultiValueAttr() {
        return inputBoxes.map(inputBox => {
            if (inputBox.multiValue)
                return inputBox.value
            return null
        }).filter(i => i !== null);
    }

    return (
        <div className="m-3">
            <Relation/>
            {checkRelation(inputBoxes) ?
                <div className="main">
                    <hr className='ms-5 me-5'/>
                    <h4>1st Normal Form:</h4>
                    <div className="1NF d-flex flex-wrap">
                        <div className="1NF-result mt-3 me-3">
                            {return1NFResult()}
                        </div>
                        <div className="1NF-reason mt-3 col-lg-4 col-md-12 col-sm-12">
                            <div className="card card-1NF-reason">
                                <div className="card-header">Reason</div>
                                <div className="card-body">
                                        {(checkMultiValueAttr().length === 0) ?
                                            <p>As there is no multi-value attribute in the relation, so the result of 1-NF would be the same as your given relation.</p>
                                            :
                                            <p>
                                                <span className="fw-bold">Multi-value Attribute</span> => [{checkMultiValueAttr().toString().replaceAll(',', ', ')}]. <br/>
                                                The relation contains multi-valued attribute, so those attributes will become the part of primary key to create a composite primary key to make sure that all the tuples are unique.
                                            </p>
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ""
            }
        </div>
    );

    function getClassName(inputBox) {
        let classname = 'inputBox mt-2 '
        if (inputBox.primary || inputBox.multiValue)
            classname += 'ib-underline';
        return classname;
    }
}

export default NF_1