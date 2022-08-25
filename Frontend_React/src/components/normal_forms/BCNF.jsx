import my_data from "../../store/data";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PrintRelations from "./printRelations";
<<<<<<< HEAD
import {get3nfReason, getBcnfReason} from "../../assets/js/nfReasons";
=======
import {getBcnfReason} from "../../assets/js/nfReasons";
>>>>>>> 4031dba8cdaa0ca49c427be4f49411325bc8d962
import DetailReason from "../DetailReason";

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
        <>
<<<<<<< HEAD

        <PrintRelations
            data={data}
            normalFormNumber='BCNF'
            names={relationNames}
            reason={getBcnfReason(data)}
        />
=======
            <PrintRelations
                data={data}
                normalFormNumber='BCNF'
                names={relationNames}
                reason={getBcnfReason(data)}
            />
>>>>>>> 4031dba8cdaa0ca49c427be4f49411325bc8d962
            <DetailReason
                type='bcnf'
            />
        </>
    );
}

export default BCNF;
