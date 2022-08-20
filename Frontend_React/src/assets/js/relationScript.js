
 export const handleSizeChange = (element) => {
    const len = element.target.value.length;
    let width = (len * 10) - (len * .2) + 2;
    if (width < 90)
        width = 90
    document.getElementById(element.target.id).style.width = width + 'px'
    element.target.blur()
}

 export function checkRelation(inputBoxes) {
     let bool = false
     for (let i = 0; i < inputBoxes.length; i++) {
         if (inputBoxes[i].value.trim().length > 0) {
             bool = true
             break
         }
     }
     return bool
 }

 export const isRelationsEmpty = (data) => {
     let len = Object.keys(data).map(rel => data[rel].length).filter(l => l !== 0);
     return len.length === 0;
 }
