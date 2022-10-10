import React, {useState} from "react";
import PrintRelations from "./printRelations";
import {get3nfReason} from "../../assets/js/nfReasons";
import DetailReason from "../DetailReason/DetailReason";
import NfsNetworkCall from "./NfsNetworkCall";
import {isDataEmpty} from "../../assets/js/emptyDataCheck";
import {Navigate} from "react-router-dom";
import my_data from "../../store/data";
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";

function NF_3() {
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
                        url={'http://127.0.0.1:5000/NF3'}
                    />
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
            }
        </>
    );
}

export default NF_3;