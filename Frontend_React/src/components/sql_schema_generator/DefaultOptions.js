import {useState} from "react";

const DefaultOptions = (props) => {
    const [showInput, setShowInput] = useState(false);
    const dropdownChangeHandler = (event) => {
        props.onChangeDefaultValue('default', event.target.value, event.target.id);
        if (event.target.value === 'USER_DEFINED')
            setShowInput(true);
        else
            setShowInput(false);
    }
    const userDefinedChangeHandler = (e) => {

    }

    return (
        <>
            <select className="form-select-sm default-select pe-1" id={props.id}
                    value={props.selectedDefaultValue}
                    onChange={dropdownChangeHandler}>
                <option value="NONE">
                    None
                </option>
                <option value="USER_DEFINED" disabled={props.isPrimary}>
                    As defined:
                </option>
                <option value="NULL" disabled={props.isPrimary}>
                    NULL
                </option>
                <option value="CURRENT_TIMESTAMP" >
                    CURRENT_TIMESTAMP
                </option>
            </select>
            {showInput &&
                <input type="text" maxLength='10' id='' className='user_defined_default' onChange={userDefinedChangeHandler}/>
            }
        </>
    );
}

export default DefaultOptions