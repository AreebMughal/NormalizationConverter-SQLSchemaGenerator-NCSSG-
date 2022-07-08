import my_data from "../../store/data";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PrintRelations from "./printRelations";

function NF_3() {
    const inputBoxes = my_data.getRawState().inputBoxes
    const relationName = my_data.getRawState().relationName
    const [relationNames, setRelationNames] = useState(null);
    const [data, setData] = useState({})

    useEffect(() => {
        axios.post('http://127.0.0.1:5000/NF3', {inputBoxes, relationName})
            .then(res => {
                console.log(res.data)
                setData(res.data['result'])
                setRelationNames(res.data['relation_names'])
            })
    }, [inputBoxes, relationName])


    function get3NFreason() {
        let reason1 = ''
        if (Object.keys(data).length > 0) {
            if (data.transitive.length > 0) {
                reason1 = <span>
                    3rd-NF works on transitive dependency. As attribute set => <span className='fw-bold'>{'{'}{data.transitive[0][1].toString().replaceAll(',', ', ')}{'}'}</span> is <span className='fw-bold'>transitive dependent</span> on
                    set => <span className='fw-bold'>{'{'}{data.transitive[0][0].toString().replaceAll(',', ', ')}{'}'}</span>. So, it would be separated as new relation.
                </span>
            }
            else {
                reason1 = <span>
                    As there is no transitive dependency in the relation, so the 3rd-NF will be the same as the result of 2-NF.
                </span>
            }
        }

        return (
            <p>
                {reason1}
            </p>
        )
    }
    return (
        <PrintRelations
            data={data}
            normalFormNumber='3rd'
            names={relationNames}
            reason={get3NFreason()}
        />
    );

}

export default NF_3;