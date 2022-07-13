import my_data from "../../store/data";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PrintRelations from "./printRelations";
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";
import DetailReason from "../DetailReason";

function NF_2() {
    // const s = get_inputBoxes(inputBoxes_data.getRawState().inputBoxes)
    // console.log('==as', s)
    const inputBoxes = my_data.getRawState().inputBoxes
    // console.log(inputBoxes)

    const relationName = inputBoxes_data.getRawState().relationName
    const [data, setData] = useState({})
    const [relationNames, setRelationNames] = useState(null);


    useEffect(() => {
        axios.post('http://127.0.0.1:5000/NF2', {inputBoxes, relationName})
            .then(res => {
                // console.log(res.data)
                setData(res.data['result'])
                setRelationNames(res.data['relation_names'])
            })
    }, [inputBoxes, relationName])

    function checkMultiValueAttr() {
        return inputBoxes.map(inputBox => {
            if (inputBox.multiValue)
                return inputBox.value
            return null
        }).filter(i => i !== null);
    }

    function get2NFreason() {
        let reason1 = ''
        let reason2 = ''
        if (Object.keys(data).length > 0) {
            if (data.multi.length > 0) {
                reason1 = <span>
                    <span className="fw-bold">Multi-value Attribute</span> =>
                    [{checkMultiValueAttr().toString().replaceAll(',', ', ')}]. <br/>
                    The relation contains multi-valued attributes, so a new relation will be made having composite
                    primary key to prevent null values in original relation.
                </span>
            }
            if (data.partial.length > 0) {
                reason2 = <span>
                    <span className="fw-bold">Partial Dependency</span>
                    <br/>
                    As attribute set => {'{'}{data.partial[0][1].toString().replaceAll(',', ', ')}{'}'} is partially dependent on
                    set => {'{'}{data.partial[0][0].toString().replaceAll(',', ', ')}{'}'}. So, this relation would be separated.
                </span>
            } else {
                reason2 = <span>
                    <span className="fw-bold">Partial Dependency</span>
                    <br/>
                    No partial dependency in the relation, so relation would be the same.
                </span>
            }
        }

        return (
            <p>
                {reason1} <br/> {reason2}
            </p>
        )
    }

    return (
        <>
            <PrintRelations
                data={data}
                normalFormNumber='2nd'
                names={relationNames}
                reason={get2NFreason()}
            />
            <DetailReason/>
        </>
    );

}

export default NF_2