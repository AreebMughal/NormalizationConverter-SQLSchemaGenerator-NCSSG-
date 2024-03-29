import ErrorModal from "../modal/ErrorModal";
import React, {useState} from "react";
import {validRange} from "../../store/validTypeRange";
import axios from "axios";
// const fs = require('fs');

const SqlForm = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const setShowFalse = () => setShowModal(false)
    const [path, setPath] = useState(null);

    const requiredLength = ['BIT', 'CHAR', 'VARCHAR']
    const singleLength = [
        "SMALLINT",
        "INT",
        "BIGINT",
        "TEXT",
        'CHAR',
        "BOOLEAN",
        'VARCHAR'
    ];
    function extractedFormData(formData) {
        let inputFields = {}
        let relationNames = []
        Object.entries(formData).map(([key, input_field]) => {
            if (input_field.className !== undefined && input_field.className.includes('input_')) {
                if (input_field.className.includes('input_rel_name')) {
                    relationNames.push(input_field)
                } else if (Object.keys(inputFields).includes(input_field.id))
                    inputFields[input_field.id].push(input_field)
                else
                    inputFields[input_field.id] = [input_field]
            }
            return ''
        })
        console.log(inputFields)
        return {inputFields: inputFields, relationNames: relationNames};
    }

    function openAlertPopup(inp_length, message) {
        inp_length.classList.add('alert_border')
        setErrorMsg(message)
        setShowModal(true)
    }

    function checkRelationNames(relationNames) {
        for (let index in relationNames) {
            console.log(relationNames[index])
            if (relationNames[index].value.trim().length === 0) {
                const msg = 'Please enter the name of Relation';
                openAlertPopup(relationNames[index], msg);
                return false;
            }
        }
        const uniqueNames = new Set(relationNames.map(relname => relname.value.toLowerCase()));
        console.log('Uniques Names',uniqueNames);
        const repeatedElements = relationNames.map(relName => {
            if (uniqueNames.has(relName.value.toLowerCase())) {
                console.log('if')
                uniqueNames.delete(relName.value.toLowerCase());
                return ''
            }
            else {
                console.log(relName.value)
                return relName;
            }
        }).filter(ele => ele !== '');
        console.log(repeatedElements)
        if (repeatedElements.length > 0) {
            const msg = 'Same name cannot be used in other relation name:\n' +
                '-> "' + repeatedElements[0].value + '"';
            openAlertPopup(repeatedElements[0], msg);
            return false;
        }
        return true;
    }

    function checkInputFields(inputFields) {
        for (let key in inputFields) {
            const input_fields = inputFields[key];
            const inp_dataType = input_fields[0].value;
            const inp_length = input_fields[1];
            let splitArray = inp_length.value.split(",");
            console.log(splitArray);

            if (inp_length.value.length === 0) {
                if (requiredLength.includes(inp_dataType)) {
                    const msg = `Please enter the length of Data Type: ${inp_dataType}`;
                    openAlertPopup(inp_length, msg);
                    return false;
                }
            } else {
                if (singleLength.includes(inp_dataType)) {
                    if (
                        !(
                            parseInt(inp_length.value) >=
                            parseInt(validRange[inp_dataType][0]) &&
                            parseInt(inp_length.value) <= parseInt(validRange[inp_dataType][1])
                        )
                    ) {
                        const msg =
                            "Please enter valid range: " +
                            inp_dataType +
                            "\nValid Range is " +
                            validRange[inp_dataType];
                        openAlertPopup(inp_length, msg);
                        return false;
                    }
                } else {
                    let range = validRange[inp_dataType];
                    console.log("range ", range);
                    let before = range["before"];
                    let after = range["after"];
                    console.log("dosri");
                    if (
                        !(
                            parseInt(before[0]) < parseInt(splitArray[0]) &&
                            parseInt(before[1]) > parseInt(splitArray[0]) &&
                            parseInt(after[0]) < parseInt(splitArray[1]) &&
                            parseInt(after[1]) > parseInt(splitArray[1])
                        )
                    ) {
                        const msg =
                            "Please enter valid range: " +
                            inp_dataType +
                            "\nValid Range " +
                            print_twovalue(validRange[inp_dataType]);
                        openAlertPopup(inp_length, msg);
                        return false;
                    }
                }
            }
            // if (!(parseInt(inp_length.value) > 0 && parseInt(inp_length.value) <= parseInt(validRange[inp_dataType]))) {

            // }
        }

        return true;
    }
    function print_twovalue(obj){
        return 'before decimal point(.) is : "'+obj['before']+'"\nand after decimal point is "'+obj['after'] + '"';

    }
    function isValidData(formData) {
        const inputFields = extractedFormData(formData)['inputFields'];
        const relationNames = extractedFormData(formData)['relationNames'];
        return checkRelationNames(relationNames) && checkInputFields(inputFields)
    }

    const formSubmit = (e) => {
        e.preventDefault();
        if (isValidData(e.target)) {
            console.log('data ', props.data)
            axios.post('http://127.0.0.1:5000/sqlSchemaGenerator', {data: props.data})
                .then(res => {
                    // console.log(res.data)
                    const element = document.createElement("a");
                    const file = new Blob([res.data], {
                        type: "text/plain"
                    });
                    element.href = URL.createObjectURL(file);
                    console.log(' URL ', element.href)
                    element.download = "dump_schema.sql";
                    document.body.appendChild(element);
                    element.click();
                })
        }
    }

    return (
        <React.Fragment>
            {showModal ?
                <ErrorModal
                    show={showModal}
                    setShow={setShowFalse}
                    message={errorMsg}
                /> : ''}
            <form onSubmit={formSubmit}>
                {props.children}
            </form>
        </React.Fragment>
    );
}

export default SqlForm;