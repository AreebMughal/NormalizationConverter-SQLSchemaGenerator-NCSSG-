import React, {useState} from "react";
import PrintRelations from "./printRelations";

import {getBcnfReason} from "../../assets/js/nfReasons";
import DetailReason from "../DetailReason";
import NfsNetworkCall from "./NfsNetworkCall";

function BCNF() {
    const [relationNames, setRelationNames] = useState(null);
    const [data, setData] = useState({})

    return (
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
    );
}

export default BCNF;
