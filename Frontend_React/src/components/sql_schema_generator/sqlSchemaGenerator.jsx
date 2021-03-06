import '../../assets/css/SqlSchemaGenerator.css';
import {useEffect, useState} from "react";
import RelationAttributes from "./RelationAttributes";
import axios from "axios";
import my_data from "../../store/data";
import SqlPageHeader from "./SqlPageHeader";
import SqlForm from "./SqlForm";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const SqlSchemaGenerator = () => {
    const inputBoxes = my_data.getRawState().inputBoxes
    const relationName = my_data.getRawState().relationName
    const [normalForm, setNormalForm] = useState(null)
    const [relationList, setRelationList] = useState([]);
    // const [modalOpen, setModalOpen] = useState(false);

    const normalFormChangeHandler = (value) => {
        setNormalForm(value)
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
            alert('Server is not running')
        })
    }, [inputBoxes, normalForm, relationName])

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
        const newRelationList = [...relationList]
        newRelationList[index] = {...relationList[index]}
        newRelationList[index].relationName[0] = event.target.value
        setRelationList(newRelationList)
        event.target.classList.remove('alert_border')
    }

    const relationKeyDownHandler = (event) => {
        if (event.key === ' ') {
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

    return (
        <div className='mt-4'>
            <SqlPageHeader
                onChange={normalFormChangeHandler}
            />
            <SqlForm data={relationList}>
                {isDataValid() ? relationList.map((obj, index) => {
                    return renderMainContent(obj, index);
                }) : (
                    <div>
                        <h4>No Relation Found</h4>
                    </div>
                )}
                <div className='float-end m-3'>
                    <input type='submit' className='btn btn-primary' value='Generate SQL Schema'/>
                </div>
            </SqlForm>
        </div>
    );
}

export default SqlSchemaGenerator;