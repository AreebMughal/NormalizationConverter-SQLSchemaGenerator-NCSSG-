
import { Store } from "pullstate";

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

