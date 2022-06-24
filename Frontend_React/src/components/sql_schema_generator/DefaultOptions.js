const DefaultOptions = (props) => {
    const dropdownChangeHandler = (event) => {
        props.onChangeDefaultValue('default', event.target.value, event.target.id)
    }

    return (
        <select className="form-select-sm default-select pe-1" id={props.id}
                value={props.selectedDefaultValue}
                onChange={dropdownChangeHandler}>
            <option value="NONE">
                None
            </option>
            <option value="USER_DEFINED">
                As defined:
            </option>
            <option value="NULL">
                NULL
            </option>
            <option value="CURRENT_TIMESTAMP">
                CURRENT_TIMESTAMP
            </option>
        </select>
    );
}

export default DefaultOptions