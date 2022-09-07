import my_data from "../../store/data";
import 'bootstrap'
import PrintRelations from "./printRelations";
import React, {useState} from "react";
import {get1nfReason} from "../../assets/js/nfReasons";
import NfsNetworkCall from "./NfsNetworkCall";

function NF_1() {
    const inputBoxes = my_data.getRawState().inputBoxes;
    const [data, setData] = useState({});
    const [relationNames, setRelationNames] = useState(null);

    return (
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
    );
}

export default NF_1;