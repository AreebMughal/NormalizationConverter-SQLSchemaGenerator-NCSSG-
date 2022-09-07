import {Component} from "react";
import Select from "react-select";

class MultiSelect extends Component {

    render() {
        const {inputBoxes, inputBoxIndex, id, onChange} = this.props

        let selectedDep = inputBoxes[inputBoxIndex].dependency[id]

        let options = inputBoxes.map(i => {
            // if (!selectedDep.includes(i.value))
                return {value: i.value, label: i.value}
            // return {value: ''}
        });
        options = options.filter(opt => opt.value !== '')

        // selectedDep = selectedDep.map(i => {
        //     return {value: i, label: i}
        // })
        // console.log('options: ', options)


        let sel = options.map(i => {
            if (selectedDep.includes(i.value))
                return i
            else
                return null
        })
        sel = sel.filter(i => i !== null)
        if (selectedDep.length === 0)
            sel = []

        // console.log('dep : ', selectedDep, ' at index:', id)
        // console.log('Selected Opt: ', sel)
        return (
            <Select
                isMulti
                value={sel}
                id={id}
                name="attributes"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) => onChange(id, e)}
            />
        );
    }
}

export default MultiSelect;