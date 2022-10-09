import '../../assets/css/SqlSchemaGenerator.css';
import React, {useEffect, useState} from "react";
import RelationAttributes from "./RelationAttributes";
import axios from "axios";
import my_data from "../../store/data";
import SqlPageHeader from "./SqlPageHeader";
import SqlForm from "./SqlForm";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ErrorModal from "../modal/ErrorModal";
import {isDataEmpty} from "../../assets/js/emptyDataCheck";
import {Navigate} from "react-router-dom";

const SqlSchemaGenerator = () => {
    const inputBoxes = my_data.getRawState().inputBoxes;
    const relationName = my_data.getRawState().relationName;
    const [normalForm, setNormalForm] = useState(null);
    const [relationList, setRelationList] = useState([]);
    // const [modalOpen, setModalOpen] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [error, setError] = useState(null);

    const normalFormChangeHandler = (value) => {
        setNormalForm(value)
    }

    function handleError(error) {
        console.log(error);
        setError(error.toString() + "\nTry Restarting Server.");
        setVisibility(true);
    }

    useEffect(() => {
        console.log('UseEffect - NormalForm')
        axios.post('http://127.0.0.1:5000/getSqlSchemaData', {
            inputBoxes,
            normalForm: normalForm,
            relationName: relationName
        })
            .then(res => {
                console.log(res.data.Data)
                setRelationList(res.data.Data)
            }).catch(error => {
            handleError(error);
        })
    }, [normalForm])

    useEffect(() => {
        console.log('use Effect - send data')

    }, [inputBoxes])

    const getNewAttributeObj = (obj, property, value) => {
        obj[property] = value;
        return obj;
    }

    const stateChangeHandler = (property, value, indexes) => {
        const [relationIndex, attributeIndex] = indexes.split('+')
        const newRelationList = [...relationList]
        // newRelationList[relationIndex] = {...relationList[relationIndex]}
        // newRelationList[relationIndex].attributes[attributeIndex] = {...relationList[relationIndex].attributes[attributeIndex]}
        newRelationList[relationIndex].attributes[attributeIndex] =
            getNewAttributeObj({...newRelationList[relationIndex].attributes[attributeIndex]}, property, value)
        relationList.map((rel, relIndex) => {
            if (relIndex !== relationIndex)
                rel.attributes.map((attr, attrIndex) => {
                    if (attributeIndex !== attrIndex &&
                        attr.value === relationList[relationIndex].attributes[attributeIndex].value &&
                        property !== 'index') {
                        newRelationList[relIndex].attributes[attrIndex] =
                            getNewAttributeObj({...newRelationList[relIndex].attributes[attrIndex]}, property, value)
                    }
                    return null;
                })
            return null;
        })
        setRelationList(newRelationList)
    }

    const relationChangeHandler = (event, index) => {
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!specialChars.test(event.target.value)) {
            const newRelationList = [...relationList]
            newRelationList[index] = {...relationList[index]}
            newRelationList[index].relationName[0] = event.target.value
            setRelationList(newRelationList)
            event.target.classList.remove('alert_border')
        }
    }

    const relationKeyDownHandler = (event) => {
        if (event.key === ' ' || event.target.value.length >= 30) {
            event.preventDefault()
        }
    }

    function isDataValid() {
        return (relationList !== null && relationList.length > 0) && relationList[0].attributes !== undefined;
    }

    function renderMainContent(obj, index) {
        if (obj.attributes.length > 0)
            return (
                <div className='my-form mt-2 pt-1' key={index}>
                    <div className='relation_type text-center'>
                        {(obj.relationName[1] !== undefined) ? obj.relationName[1].toUpperCase() : ''}
                    </div>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Relation Name"
                        className="mb-3 floating-label"
                    >
                        <Form.Control
                            className='input_rel_name floating-fields' type="text" title="Enter Relation Name"
                            placeholder="name@example.com"
                            onChange={(e) => relationChangeHandler(e, index)}
                            aria-valuemax={10}
                            onKeyDown={relationKeyDownHandler}
                            value={obj.relationName[0]}
                        />
                    </FloatingLabel>
                    <RelationAttributes
                        key={index}
                        attributes={obj.attributes}
                        relIndex={index}
                        onChangeHandler={stateChangeHandler}
                    />
                </div>
            );
        else
            return '';
    }

    console.log(typeof relationList, relationList.length)
    return (
        <>
            {isDataEmpty(inputBoxes, relationName) ?
                <Navigate replace to={'/NC-SSG/DrawingTool'}/>
                :
                <>
                    {visibility &&
                    <ErrorModal
                        show={visibility}
                        message={error}
                        setShow={() => setVisibility(false)}
                    />
                    }
                    <div className='mt-4'>
                        <SqlPageHeader
                            onChange={normalFormChangeHandler}
                        />
                        <SqlForm data={relationList}>
                            {isDataValid() &&
                            <>
                                {relationList.map((obj, index) => {
                                    return renderMainContent(obj, index);
                                })}
                                <div className='float-end m-3'>
                                    <input type='submit' className='btn btn-primary' value='Generate SQL Schema'/>
                                </div>
                            </>
                                // : (
                                // <div>
                                //     <h4>No Relation Found</h4>
                                // </div>
                            }

                        </SqlForm>
                    </div>
                </>
            }
        </>
    );
}

export default SqlSchemaGenerator;