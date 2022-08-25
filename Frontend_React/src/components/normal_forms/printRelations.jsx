import my_data from "../../store/data";
import {checkRelation, handleSizeChange, isRelationsEmpty} from "../../assets/js/relationScript";
import {useEffect, useState} from "react";
import Relation from "./relation";

function PrintRelations(props) {
    const inputBoxes = my_data.getRawState().inputBoxes;
    const [data, setData] = useState([{}]);
    const [relationNames, setRelationNames] = useState({});
    let count = 1;

    useEffect(() => {
        setData(props.data)
        setRelationNames(props.names)
    }, [props.data, props.names]);

    const renderRelation = () => {
        return (
            checkRelation(inputBoxes) ?
                <div className={`${props.normalFormNumber[0]}NF`}>
                    {
                        Object.keys(data).map((key, key_index) => {
                                if (data[key].length !== 0) {
                                    const rel = (key === 'multi' ? '-VALUED' : ' Dependent') + ' Relations';
                                    return (
                                        <div key={key_index+count}>
                                            <div className='text-center relation_type' key={key_index}>
                                                {key.toUpperCase() + rel}
                                            </div>
                                            {
                                                Object.keys(data[key]).map((list, index) => {
                                                        const len = data[key][list][0].length;
                                                        const name = props.names[key][list][0]
                                                        let num = 0;
                                                        let check = 0;
                                                        return (
                                                            <div className="d-flex flex-wrap"
                                                                 key={key_index + '-' + index + count}>
                                                                {/*<span>Relation-{count++}: </span>*/}
                                                                <span className='mt-3'
                                                                      style={{width: 120}}>{name}: </span>
                                                                {
                                                                    (data[key][list].toString().split(',')).map((value, ind) => {
                                                                            const bool = (++check <= len);
                                                                            return (
                                                                                <input key={num++ + '-' + count++}
                                                                                       className={get2NFClassName(value, key, bool)}
                                                                                       type="text" readOnly autoFocus
                                                                                       value={value}
                                                                                       id={`${props.normalFormNumber[0]}nf-${key}-${num}-${ind}-${index}`}
                                                                                       onFocus={handleSizeChange}
                                                                                />);
                                                                        }
                                                                    )
                                                                }
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                    );
                                } else return '';
                            }
                        )
                    }
                </div>
                : ""
        );
    }

    function returnNFRelations() {
        return (
            <div className={`card card-${props.normalFormNumber[0]}NF-result`}>
                <div className="card-header">{props.normalFormNumber[0]}-NF Result</div>
                <div className="card-body pt-0">
                    {renderRelation()}
                </div>
            </div>
        );
    }

    return (
        <div className="m-3">
            <Relation/>
            <hr className='ms-5 me-5'/>
            {!isRelationsEmpty(props.data) ?
                <div className="main">
                    <h4>{props.normalFormNumber} Normal Form:</h4>
                    <div className="d-flex flex-wrap">
                        <div className=" mt-3 me-3">
                            {returnNFRelations()}
                        </div>
                        <div className="NF-reason mt-3 col-lg-4 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="card-header">Reason</div>
                                <div className="card-body">
                                    {props.reason}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : "No relation found in normalized result    "
            }
        </div>
    );

    function get2NFClassName(value, key, flag) {
        let underline = '';
        for (let i = 0; i < data[key].length; i++) {
            if ((flag && data[key][i][0].includes(value)) || key.toLowerCase() === 'multi')
                underline = 'ib-underline';
            if (props.normalFormNumber[0] === '1')
                underline = get1nfClass(value);
        }
        return 'inputBox mt-2 ' + underline;
    }

    function get1nfClass(value) {
        const isMulti = inputBoxes.filter(inputBox =>
            inputBox.value === value && (inputBox.multiValue || inputBox.primary)).length
        return isMulti !== 0 ? 'ib-underline' : '';
    }
}

export default PrintRelations;