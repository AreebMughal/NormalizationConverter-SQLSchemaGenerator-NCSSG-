import my_data from "../../store/data";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PrintRelations from "./printRelations";
import {get3nfReason} from "../../assets/js/nfReasons";
import DetailReason from "../DetailReason";

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

    return (
        <>
            <PrintRelations
                data={data}
                normalFormNumber='3rd'
                nf_type='3'
                names={relationNames}
                reason={get3nfReason(data)}
            />
            <DetailReason
                type='3rd'
            />
        </>
    );
}

export default NF_3;