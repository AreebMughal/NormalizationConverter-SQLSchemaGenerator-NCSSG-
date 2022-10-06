import my_data from "../../store/data";
import 'bootstrap'
import PrintRelations from "./printRelations";
import React, {useState} from "react";
import {get1nfReason} from "../../assets/js/nfReasons";
import NfsNetworkCall from "./NfsNetworkCall";
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";
import {Navigate} from "react-router-dom";
import {isDataEmpty} from "../../assets/js/emptyDataCheck";

function NF_1() {
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
                        url={'http://127.0.0.1:5000/NF1'}
                    />
                    <PrintRelations
                        data={data}
                        normalFormNumber='1st'
                        nf_type='1'
                        names={relationNames}
                        reason={get1nfReason(inputBoxes)}
                    />
                </>
            }
        </>
    );
}

export default NF_1;