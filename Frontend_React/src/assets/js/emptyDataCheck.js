export function isDataEmpty(inputBoxes, relationName) {
    return (
        (inputBoxes.length === 1 && inputBoxes[0].value.trim() === '')
        && relationName.trim().length === 0
    );
}