import my_data from "../../store/data";
import React, {useState} from "react";
import PrintRelations from "./printRelations";
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";
import {get2nfReason} from "../../assets/js/nfReasons";
import DetailReason from "../DetailReason";
import NfsNetworkCall from "./NfsNetworkCall";
import {isDataEmpty} from "../../assets/js/emptyDataCheck";
import {Navigate} from "react-router-dom";

function NF_2() {

    const inputBoxes = my_data.getRawState().inputBoxes;
    const relationName = inputBoxes_data.getRawState().relationName;
    const [data, setData] = useState({});
    const [relationNames, setRelationNames] = useState(null);

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
                        url={'http://127.0.0.1:5000/NF2'}
                    />
                    <PrintRelations
                        data={data}
                        normalFormNumber='2nd'
                        nf_type='2'
                        names={relationNames}
                        reason={get2nfReason(data, inputBoxes)}

                    />
                    <DetailReason
                        type='2nd'
                    />
                </>
            }
        </>
    );
}

export default NF_2