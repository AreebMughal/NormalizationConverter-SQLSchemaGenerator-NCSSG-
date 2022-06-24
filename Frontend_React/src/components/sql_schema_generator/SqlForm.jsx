import ErrorModal from "../modal/ErrorModal";
import React, {useState} from "react";
import {validRange} from "../../store/validTypeRange";
import axios from "axios";

const SqlForm = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const setShow = () => setShowModal(false)

    const requiredLength = ['BIT', 'CHAR', 'VARCHAR']

    function extractedFormData(formData) {
        let inputFields = {}
        let relationNames = []
        Object.entries(formData).map(([key, input_field]) => {
            if (input_field.className !== undefined && input_field.className.includes('input_')) {
                if (input_field.className.includes('input_rel_name')) {
                    relationNames.push(input_field)
                }
                else if (Object.keys(inputFields).includes(input_field.id))
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
        return true;
    }

    function checkInputFields(inputFields) {
        for (let key in inputFields) {
            const input_fields = inputFields[key]
            const inp_dataType = input_fields[0].value;
            const inp_length = input_fields[1];
            if (inp_length.value.length === 0) {
                if (requiredLength.includes(inp_dataType)) {
                    const msg = `Please enter the length of Data Type: ${inp_dataType}`;
                    openAlertPopup(inp_length, msg);
                    return false
                }
            } else {
                if (!(parseInt(inp_length.value) > 0 && parseInt(inp_length.value) <= parseInt(validRange[inp_dataType]))) {
                    const msg = 'Please enter valid range: ' + inp_dataType + '\nValid Range is ' + validRange[inp_dataType];
                    openAlertPopup(inp_length, msg);
                    return false
                }
            }
        }

    }

    function isValidData(formData) {
        const inputFields = extractedFormData(formData)['inputFields'];
        const relationNames = extractedFormData(formData)['relationNames'];
        return checkRelationNames(relationNames) && checkInputFields(inputFields)
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(props)
        if (isValidData(e.target)) {
            axios.post('http://127.0.0.1:5000/sqlSchemaGenerator', {data: props.data })
                .then(res => {
                    console.log(res.data)
                })
        }
    }

    return (
        <React.Fragment>
            {showModal ?
                <ErrorModal
                    show={showModal}
                    setShow={setShow}
                    message={errorMsg}
                /> : ''}
            <form onSubmit={formSubmit}>
                {props.children}
            </form>
        </React.Fragment>
    );
}

export default SqlForm;