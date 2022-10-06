import React, {useState} from "react";
import PrintRelations from "./printRelations";

import {getBcnfReason} from "../../assets/js/nfReasons";
import DetailReason from "../DetailReason";
import NfsNetworkCall from "./NfsNetworkCall";
import {isDataEmpty} from "../../assets/js/emptyDataCheck";
import {Navigate} from "react-router-dom";
import my_data from "../../store/data";
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";

function BCNF() {
    const inputBoxes = my_data.getRawState().inputBoxes;
    const relationName = inputBoxes_data.getRawState().relationName;

    const [relationNames, setRelationNames] = useState(null);
    const [data, setData] = useState({})

    return (
        <>
            {isDataEmpty(inputBoxes, relationName) ?
                <Navigate replace to={'/NC-SSG/DrawingTool'}/>
                :
                <>
                    <NfsNetworkCall
                        data={data}
                        relationNames={relationNames}
                        setData={setData}
                        setRelationNames={setRelationNames}
                        url={'http://127.0.0.1:5000/BCNF'}
                    />
                    <PrintRelations
                        data={data}
                        normalFormNumber='Boyce - Codd'
                        nf_type='BC'
                        names={relationNames}
                        reason={getBcnfReason(data)}
                    />
                    <DetailReason
                        type='bcnf'
                    />
                </>
            }
        </>
    );
}

export default BCNF;
