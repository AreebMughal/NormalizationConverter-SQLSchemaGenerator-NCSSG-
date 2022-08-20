import my_data from "../../store/data";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PrintRelations from "./printRelations";
import {get3nfReason} from "../../assets/js/nfReasons";

function BCNF() {
    const inputBoxes = my_data.getRawState().inputBoxes
    const relationName = my_data.getRawState().relationName
    const [relationNames, setRelationNames] = useState(null);
    const [data, setData] = useState({})

    useEffect(() => {
        axios.post('http://127.0.0.1:5000/BCNF', {inputBoxes, relationName})
            .then(res => {
                console.log(res.data)
                setData(res.data['result'])
                setRelationNames(res.data['relation_names'])
            })
    }, [inputBoxes, relationName])

    return (
        <PrintRelations
            data={data}
            normalFormNumber='BCNF'
            names={relationNames}
            reason={get3nfReason(data)}
        />
    );
}

export default BCNF;