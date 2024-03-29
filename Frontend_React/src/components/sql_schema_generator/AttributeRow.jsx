import React, {useEffect, useState} from "react";
import DataTypeOptions from "./DataTypeOptions";
import DefaultOptions from "./DefaultOptions";
import IndexOptions from "./IndexOptions";
import PopupModal from "../modal/Modal";

const AttributeRow = (props) => {
    const [attributeName, setAttributeName] = useState('');
    const [dataType, setDataType] = useState('INT')
    const [length, setLength] = useState('');
    const [defaultValue, setDefaultValue] = useState('NONE')
    const [index, setIndex] = useState('none')
    const [autoIncrement, setAutoIncrement] = useState(false);
    const [nullValue, setNullValue] = useState(false);
    const [disableType, setDisableType] = useState(false);

    useEffect(() => {
        setDataType(props.attribute['type']);
        setLength(props.attribute['length']);
        setAutoIncrement(props.attribute['autoIncrement']);
        setDefaultValue(props.attribute['default']);
        setNullValue(props.attribute['null']);
        setAttributeName(props.attribute.value)
        setIndex(props.attribute.index)
        ref.current.checked = props.attribute['null'];
        ref2.current.checked = props.attribute['autoIncrement'];
    }, [props.attribute])

    let ref = React.createRef();
    const ref2 = React.createRef();
    const validAutoIncDataTypes = ['INT', 'BIGINT', 'SMALLINT'];
    const disableLenDataTypes = ["DATE", "DATETIME", "TIMESTAMP", "TIME", "YEAR"];
    const canAutoIncrement = !validAutoIncDataTypes.includes(dataType);
    const disableLength = disableLenDataTypes.includes(dataType);
    // const attributeNameChangeHandler = event => {
    //     setAttributeName(event.target.value)
    //     props.onChangeHandler('value', event.target.value, event.target.id)
    // }

    const dataTypeChangeHandler = (property, selectedDataType, id) => {
        setDataType(selectedDataType)
        props.onChangeHandler(property, selectedDataType, id)
    }

    const indexChangeHandler = (property, selectedIndex, id) => {
        setIndex(selectedIndex)
        props.onChangeHandler(property, selectedIndex, id)
    }

    const defaultValueChangeHandler = (property, selectedDefaultValue, id) => {
        setDefaultValue(selectedDefaultValue)
        props.onChangeHandler(property, selectedDefaultValue, id)
        if (selectedDefaultValue === 'NULL') {
            ref.current.click()
            setNullValue(true)
            props.onChangeHandler('null', 'NULL', id)
        }
    }

    const lengthChangeHandler = event => {
        const inputField = event.target.value;
        const checkINT = /^\d+$/.test(inputField);
        const checkFLOAT = /^[0-9,]+$/.test(inputField);
        if (
            dataType === "INT" ||
            dataType === "SMALLINT" ||
            dataType === "BIGINT"||
            dataType === "VARCHAR" ||
            dataType === "TEXT" ||
            dataType === "CHAR"||
            dataType === "BOOLEAN"

        ) {
            if (checkINT === true || inputField.length === 0) {
                event.target.classList.remove("alert_border");
                props.onChangeHandler("length", event.target.value, event.target.id);
            } else {
                event.preventDefault();
            }
        } else if (
            dataType === "FLOAT" ||
            dataType === "DECIMAL" ||
            dataType === "DOUBLE"
        ) {
            if (checkFLOAT === true || inputField.length === 0) {
                if (inputField.split(",").length >= 1) {
                    console.log("TRUE")
                    event.target.classList.remove("alert_border");
                    props.onChangeHandler("length", event.target.value, event.target.id);
                } else {
                    event.preventDefault();
                }
            } else {
                event.preventDefault();
            }
        } else {
            props.onChangeHandler("length", event.target.value, event.target.id);
        }

    }

    const autoIncrementChangeHandler = event => {
        setAutoIncrement(event.target.checked)
        props.onChangeHandler('autoIncrement', event.target.checked, event.target.id)
        // indexChangeHandler('index', 'primary', event.target.id) //to auto select the primary index
        setDisableType(event.target.checked)
        if (!(dataType === 'INT' && dataType === 'TINYINT' && dataType === 'SMALLINT'
            && dataType === 'MEDIUMINT' && dataType === 'BIGINT')) {
            setDataType('INT')
        }
    }

    const nullValueChangeHandler = event => {
        // console.log(event)
        setNullValue(event.target.checked)
        props.onChangeHandler('null', event.target.checked, event.target.id)
    }


    const indexes = `${props.relIndex}+${props.index}`
    return (
        <tr key={props.index}>
            <th scope="row" width='2%'>{props.index + 1}.</th>
            <td width='10%' className='font-weight-bold'>
                <input type="text" className='input-box' id={indexes} placeholder='Attribute Name' value={attributeName}
                    // onChange={attributeNameChangeHandler}
                       readOnly={true}
                />
            </td>
            <td width='10%'>
                <DataTypeOptions
                    selectedType={dataType}
                    onChangeDataType={dataTypeChangeHandler}
                    id={indexes}
                    disable={disableType}
                />
            </td>

            <td width='10%'>
                <input type="text" className='input-box input_length' onChange={lengthChangeHandler} id={indexes}
                       value={length} disabled={disableLength} />
                <PopupModal index={indexes} dataType={dataType}/>

            </td>
            <td width='10%'>
                <DefaultOptions
                    isPrimary={index === 'primary'}
                    selectedDefaultValue={defaultValue}
                    onChangeDefaultValue={defaultValueChangeHandler}
                    id={indexes}
                />
            </td>
            <td width='5%'>
                <IndexOptions
                    selectedIndex={index}
                    onChangeIndex={indexChangeHandler}
                    id={indexes}
                />
            </td>
            <td width='4%' className=''>
                <div className="text-center">
                    <input
                        type="checkbox"
                        className="form-check-input text-center"
                        value={autoIncrement}
                        id={indexes}
                        disabled={canAutoIncrement}
                        onChange={autoIncrementChangeHandler}
                        ref={ref2}
                    />
                </div>
            </td>
            <td width='4%' className=''>
                <div className="text-center">
                    <input
                        type="checkbox"
                        className="form-check-input text-center null-checkbox"
                        value={nullValue}
                        id={indexes}
                        ref={ref}
                        disabled={index === 'primary'}
                        onChange={nullValueChangeHandler}
                    />
                </div>
            </td>
        </tr>
    );
}

export default AttributeRow;