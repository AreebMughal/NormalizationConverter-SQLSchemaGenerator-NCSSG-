
import { Store } from "pullstate";

const my_data = new Store({
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
})

export default my_data
