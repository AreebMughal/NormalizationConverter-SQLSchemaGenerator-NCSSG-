import React, {useState} from "react";
import PrintRelations from "./printRelations";
import {get3nfReason} from "../../assets/js/nfReasons";
import DetailReason from "../DetailReason";
import NfsNetworkCall from "./NfsNetworkCall";

function NF_3() {

    const [relationNames, setRelationNames] = useState(null);
    const [data, setData] = useState({})

    return (
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
    );
}

export default NF_3;