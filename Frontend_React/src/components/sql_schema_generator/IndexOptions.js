const IndexOptions = (props) => {
    const dropdownChangeHandler = (event) => {
        props.onChangeIndex('index', event.target.value, event.target.id)
    }
    const isPrimary = props.selectedIndex === 'primary';
    return (
        <select className='form-select-sm pe-1' id={props.id} value={props.selectedIndex} onChange={dropdownChangeHandler} disabled={isPrimary}>
            <option value="none" disabled={isPrimary}>---</option>
            {isPrimary &&
            <option value="primary" title="Primary" disabled={!isPrimary}>
                PRIMARY
            </option>
            }
            <option value="unique" title="Unique" disabled={isPrimary}>
                UNIQUE
            </option>
            <option value="index" title="Index" disabled={isPrimary}>
                INDEX
            </option>
            <option value="fulltext" title="Fulltext" disabled={isPrimary}>
                FULLTEXT
            </option>
            <option value="spatial" title="Spatial" disabled={isPrimary}>
                SPATIAL
            </option>
        </select>
    );
}

export default IndexOptions;