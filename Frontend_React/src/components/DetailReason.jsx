import React, {useEffect, useState} from 'react'
import axios from "axios";
import my_data from "../store/data";
import '../assets/css/relation.css'
import {inputBoxes_data} from "../store/inputBoxes_dataStore";


const DetailReason = (props) => {
    const [toggle, setToggle] = useState(false);
    const inputBoxes = my_data.getRawState().inputBoxes
    const relationName = inputBoxes_data.getRawState().relationName
    const [data, setData] = useState([{}])

    console.log('asdas');
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

    function nf_2Reason() {
        //multivaluedAsIt is already happening
        let string ='';
        const primaryKey = getPrimarKeys();
        for (let i = 0; i<primaryKey.length;i++){

        }
        //let StringPK = getPrimarKeys().toString();

        if (Object.keys(data).length >= 1) {
            for (let i = 1; i <= Object.keys(data['step_3']).length; i++) {

                for (let j = 0; j < 1; j++) {


                string += `Round ${i}\n`;
                    //console.log(data['step_3'][i][j][0])
                    // let partial = primaryKey.search(data['step_3'][i][j][0])
                   // console.log("ss",data['step_3'][i][j][0])
                   //  console.log("dd",primaryKey[j])
                        console.log(typeof data['step_3'][i][j][0])

                if (data['step_3'][i][j] !== primaryKey) {

                    string += `The FD ${data['step_3'][i][j]} --> ${data['step_3'][i][j+1]} is a partial dependency As LHS  ${data['step_3'][i][j]} is a proper subset of ${primaryKey} which is a PK , so we split it `
                }
                // let variable = data['step_3'][i][j][0]

                else if(data['step_3'][i][j][0] == primaryKey[1] || data['step_3'][i][j][0] == primaryKey[0]) {
                    string += `The FD ${data['step_3'][i][j]} is already in 2NF`;
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
        const primaryKey = getPrimarKeys();
        let string = ''
        if (Object.keys(data).length >= 1) {
            for (let i = 0; i < Object.keys(data['step_3']).length; i++) {
                string += `Round  ${i}`
                //partialPrimaryKey = partofPrimarykey
                if (data['step_3'][i] !== primaryKey || data['step_3'][i] !== primaryKey) {
                    string += "The FD {data['step_3'][i][i]} is a transitive dependency As LHS data['step_3'][i][i] is not PrimaryKey, so we split it into a new relation"
                }
                if (data['step_3'][i] === primaryKey) {
                    string += "The FD {data['step_3'][i][i]} is already in 3NF"
                }

            }
        }
        return (<div>
                {string}
            </div>
        );

    }


    function  getType(){


        if(props.type == '2nd'){
              return nf_2Reason()


        }
        else return nf_3Reason()

    }
    return (
        <React.Fragment>
            <div className="mx-4">
                <hr></hr>
                <button onClick={() => setToggle(!toggle)}>Show Steps</button>
                {(toggle) ?
                    <div>
                        { minimalCover() }
                        { getType() }
                    </div>
                    : ''
                }
            </div>

        </React.Fragment>
    );

}

export default DetailReason