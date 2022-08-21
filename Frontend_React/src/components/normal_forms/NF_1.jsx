import my_data from "../../store/data";
import 'bootstrap'
import PrintRelations from "./printRelations";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";
import {get1nfReason} from "../../assets/js/nfReasons";

function NF_1() {
    const inputBoxes = my_data.getRawState().inputBoxes;
    const relationName = inputBoxes_data.getRawState().relationName;

    const [data, setData] = useState({});
    const [relationNames, setRelationNames] = useState(null);

    useEffect(() => {
        axios.post('http://127.0.0.1:5000/NF1', {inputBoxes, relationName})
            .then(res => {
                setData(res.data['result'])
                setRelationNames(res.data['relation_names'])
            })
    }, [inputBoxes, relationName])


    return (
        <PrintRelations
            data={data}
            normalFormNumber='1st'
            names={relationNames}
            reason={get1nfReason(inputBoxes)}
        />
    );
}

export default NF_1;