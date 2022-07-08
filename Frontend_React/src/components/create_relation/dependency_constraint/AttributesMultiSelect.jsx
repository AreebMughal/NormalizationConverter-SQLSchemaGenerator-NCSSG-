import Select from "react-select";

const AttributesMultiSelect = (props) => {
    const {inputBoxes, inputBox, depIndex} = props;

    let selectedDependencies = inputBox.dependency[depIndex];

    let options = inputBoxes.map(i => {
        return {value: i.id, label: i.value}
    });
    options = options.filter(opt => opt.label !== '')
    let selectedValues = options.map(i => selectedDependencies.includes(i.value) ? i : null);

    selectedValues = selectedValues.filter(i => i !== null)
    if (selectedDependencies.length === 0)
        selectedValues = []

    const multiSelectChangeHandler = (elements) => {
        // console.log(elements)

        const values = elements.map(opt => opt.value);
        if (inputBox !== undefined && inputBox.value.toString().trim() !== '') {
            let newInputBox = {...inputBox};
            newInputBox.dependency = [...newInputBox.dependency];
            newInputBox.dependency[depIndex] = values;
            props.updateCurrentInputBox(newInputBox);
        }
    };

    return (
        <Select
            isMulti
            value={selectedValues}
            id={depIndex}
            name="attributes"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={multiSelectChangeHandler}
        />
    );
}

export default AttributesMultiSelect;