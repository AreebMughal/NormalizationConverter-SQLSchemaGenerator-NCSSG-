import {Store} from "pullstate";
import my_data from "./data";

export const inputBoxes_data = new Store({
    relationName: '',
    inputBoxes: [
        {
            id: 1,
            value: '',
            width: 90,
            dependency: [[]],
            primary: false,
            multiValue: false,
        }
    ],
});

export const suggestion_store = new Store({
    value: ''
})

export const get_inputBoxes = () => {
    let inputBoxes = inputBoxes_data.getRawState().inputBoxes;
    const newInputBoxes = inputBoxes.map((input, index) => input.dependency.map((dep, i) => {
            const list = dep.map(id => inputBoxes.filter(inputBox => id === inputBox.id)[0].value);
            const newInputBox = {...inputBoxes[index]}
            newInputBox.dependency = [...newInputBox.dependency];
            newInputBox.dependency[i] = list;
            return newInputBox;
        })[0]
    );
    my_data.update(s => {
        s.inputBoxes = newInputBoxes
        s.relationName = inputBoxes_data.getRawState().relationName
    })
    return newInputBoxes;
}
