import my_data from "../../store/data";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PrintRelations from "./printRelations";
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";
import {get2nfReason} from "../../assets/js/nfReasons";

function NF_2() {
    const inputBoxes = my_data.getRawState().inputBoxes
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

    return (
        <PrintRelations
            data={data}
            normalFormNumber='2nd'
            names={relationNames}
            reason={get2nfReason(data, inputBoxes)}
        />
    );
}

export default NF_2