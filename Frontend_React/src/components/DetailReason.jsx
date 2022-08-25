import React, {useEffect, useState} from 'react'
import axios from "axios";
import my_data from "../store/data";
import '../assets/css/relation.css'
import {inputBoxes_data} from "../store/inputBoxes_dataStore";
import Bold from "./general_UI/Bold";


const DetailReason = (props) => {
    const [toggle, setToggle] = useState(false);
    const inputBoxes = my_data.getRawState().inputBoxes;
    const relationName = inputBoxes_data.getRawState().relationName
    const [data, setData] = useState([{}])

    useEffect(() => {
        axios.post('http://127.0.0.1:5000/minimalCover', {inputBoxes, relationName})
            .then(res => {
                console.log(res.data)
                setData(res.data['result'])
            })
    }, [inputBoxes, relationName])
    console.log('Data => ', data)

    function getfdsList(step) {
        return step !== undefined ? <ol>
            {Object.keys(step).map(i => {
                return <li key={i}> {step[i][0].toString().replaceAll(',', ', ') + " --> " + step[i][1]} </li>
            })}
        </ol> : "Error";
    }

    function minimalCover() {
        return (
            <div className="minimal-cover-result ">
                <h4>Minimal Cover Result: </h4>
                {getfdsList(data.step_3)}
            </div>
        );

    }

    const getPrimarKeys = () => {
        return inputBoxes.map(input => {
            if (input.primary) {
                return input.value;
            }
            return ''
        }).filter(i => i !== '');
    }
    const getMultiValued = () => {
        return inputBoxes.map(input => {
            if (input.multiValue) {
                return input.value;
            }
            return ''
        }).filter(i => i !== '');
    }


    function nf_2Reason() {
<<<<<<< HEAD

        let string ='';

=======

        let string = '';

>>>>>>> 4031dba8cdaa0ca49c427be4f49411325bc8d962
        const primaryKey = getPrimarKeys().toString();

        if (Object.keys(data).length >= 1) {
            for (let i = 1; i <= Object.keys(data['step_3']).length; i++) {

                for (let j = 0; j < 1; j++) {


<<<<<<< HEAD
                string += `Round ${i}\n`;

                if (data['step_3'][i][j] == primaryKey || (primaryKey.includes(data['step_3'][i][j][0]) && primaryKey.includes(data['step_3'][i][j][1]))) {


                    string += `The FD ${data['step_3'][i][j]}  --> ${data['step_3'][i][j+1]} is already in 2NF`;
                }

                else  {
                    string += `The FD ${data['step_3'][i][j]} --> ${data['step_3'][i][j+1]} is a partial dependency As LHS  ${data['step_3'][i][j]} is a proper subset of ${primaryKey} which is a PK , so we split it`

                }
=======
                    string += `Round ${i}\n`;

                    if (data['step_3'][i][j] === primaryKey || (primaryKey.includes(data['step_3'][i][j][0]) && primaryKey.includes(data['step_3'][i][j][1]))) {


                        string += `The FD ${data['step_3'][i][j]}  --> ${data['step_3'][i][j + 1]} is already in 2NF`;
                    } else {
                        string += `The FD ${data['step_3'][i][j]} --> ${data['step_3'][i][j + 1]} is a partial dependency As LHS  ${data['step_3'][i][j]} is a proper subset of ${primaryKey} which is a PK , so we split it`
>>>>>>> 4031dba8cdaa0ca49c427be4f49411325bc8d962

                    }

                }
            }
        }

        return (
            <div>
                {string}
            </div>
        );

    }

    function nf_3Reason() {
        const primaryKey = getPrimarKeys().toString();
        let string = ''
        if (Object.keys(data).length >= 1) {
<<<<<<< HEAD
            for (let i = 1; i < (Object.keys(data['step_3']).length)+1; i++) {
=======
            for (let i = 1; i < (Object.keys(data['step_3']).length) + 1; i++) {
>>>>>>> 4031dba8cdaa0ca49c427be4f49411325bc8d962
                string += `Round  ${i} `
                for (let j = 0; j < 1; j++) {
                    console.log(data['step_3'][i][j].toString())
                    console.log(primaryKey)
                    if (data['step_3'][i][j] === primaryKey || ((primaryKey.includes(data['step_3'][i][j][0]) || primaryKey.includes(data['step_3'][i][j][1])))) {
<<<<<<< HEAD
                        string += `The FD ${data['step_3'][i][j]}  --> ${data['step_3'][i][j+1]} is already in 3NF `;
                        //string += "The FD {data['step_3'][i][i]} is a transitive dependency As LHS data['step_3'][i][i] is not PrimaryKey, so we split it into a new relation"
                    }
                    else  {
                        string+=`The FD ${data['step_3'][i][j]} is a transitive dependency As LHS ${data['step_3'][i][j]} is not PrimaryKey, so we split it into a new relation`
                    }

                }

            }
        }
        return (<div>
                {string}
            </div>
        );

    }

    function bnfReason() {
        const primaryKey = getPrimarKeys().toString();
        let string = ''
        if (Object.keys(data).length >= 1) {

            for (let i = 1; i < Object.keys(data['step_3']).length; i++) {
                //console.log(data['step_3'][i][i])
                string += `Round  ${i}`
                if ((primaryKey.includes(data['step_3'][i][i])) || (primaryKey.includes(data['step_3'][i][i]))) {
                    string += `yay `
                }
                else {
                    string += `no `
=======
                        string += `The FD ${data['step_3'][i][j]}  --> ${data['step_3'][i][j + 1]} is already in 3NF `;
                        //string += "The FD {data['step_3'][i][i]} is a transitive dependency As LHS data['step_3'][i][i] is not PrimaryKey, so we split it into a new relation"
                    } else {
                        string += `The FD ${data['step_3'][i][j]} is a transitive dependency As LHS ${data['step_3'][i][j]} is not PrimaryKey, so we split it into a new relation`
                    }

>>>>>>> 4031dba8cdaa0ca49c427be4f49411325bc8d962
                }

            }
        }
        return (<div>
                {string}
            </div>
        );

    }

    function bnfReason() {
        const primaryKey = getPrimarKeys().toString();
        let string = ''
        if (Object.keys(data).length >= 1) {

<<<<<<< HEAD
    function  getType(){


        if(props.type == '2nd'){
              return nf_2Reason()

        }
        else if (props.type == '3rd'){
            return nf_3Reason()
        }
        else
            return bnfReason()
=======
            for (let i = 1; i < Object.keys(data['step_3']).length; i++) {
                //console.log(data['step_3'][i][i])
                string += `Round  ${i}`
                if ((primaryKey.includes(data['step_3'][i][i])) || (primaryKey.includes(data['step_3'][i][i]))) {
                    string += `yay `
                } else {
                    string += `no `
                }

            }
        }
        return (<div>
                {string}
            </div>
        );
    }
>>>>>>> 4031dba8cdaa0ca49c427be4f49411325bc8d962

    function getType() {
        if (props.type === '2nd') {
            return nf_2Reason();
        } else if (props.type === '3rd') {
            return nf_3Reason();
        } else
            return bnfReason();
    }

    return (
        <React.Fragment>
            <div className="mx-4">
                <hr></hr>
                <button onClick={() => setToggle(!toggle)}>Show Steps</button>
                {(toggle) ?
                    <div>
                        {minimalCover()}
                        {getType()}
                    </div>
                    : ''
                }
            </div>

        </React.Fragment>
    );

}

export default DetailReason