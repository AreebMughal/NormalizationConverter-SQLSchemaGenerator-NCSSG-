import React, {useEffect, useState} from "react";
import styles from './css/mainTool.module.css'
import CreateRelation from "./relation/CreateRelation";
import DependencyNConstraint from "./dependency_constraint/DependencyNConstraint";
import FdsList from "./fds_list/FdsList";
import {get_inputBoxes, inputBoxes_data} from "../../store/inputBoxes_dataStore";
import Suggestion from "./fds_list/Suggestion";

const MainTool = () => {
    const [inputBoxes, setInputBoxes] = useState([]);
    const [relationName, setRelationName] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [disableConstraintBox, setDisableConstraintBox] = useState(false);
    const [currentCell, setCurrentCell] = useState(false);

    const data = inputBoxes_data.getRawState()

    useEffect(() => {
        setInputBoxes(data.inputBoxes)
        setRelationName(data.relationName)
    }, []);

    useEffect(() => {
        inputBoxes_data.update(s => {
            s.inputBoxes = inputBoxes
            s.relationName = relationName
        })
        get_inputBoxes()

    }, [inputBoxes, relationName]);


    const setRelation = (value) => {
        setRelationName(value)
    }

    const updateInputBoxes = (newInputBoxes) => {
        setInputBoxes(newInputBoxes)
    }

    const removeAttribute = (index) => {
        let newInputBoxes = [...inputBoxes];
        let val = newInputBoxes[index].value;
        newInputBoxes.splice(index, 1)
        for (let i = 0; i < newInputBoxes.length; i++) {
            newInputBoxes[i] = {...newInputBoxes[i]}
            newInputBoxes[i].dependency = [...newInputBoxes[i].dependency]
            newInputBoxes[i].dependency = newInputBoxes[i].dependency.map(dep => dep.filter(value => value !== val))
        }
        updateInputBoxes(newInputBoxes);
    }
    const resetAll = () => setInputBoxes([{
        id: 1,
        value: '',
        dependency: [[]],
        primary: false,
        multiValue: false,
    }]);
    const updateCurrentIndex = (index) => {
        setCurrentIndex(index);
    }
    return (
        <section className={`${styles.main}`}>
            <div className="m row col-12">
                <div className="col-lg-8 col-md-8 col-sm-12">

                    <CreateRelation
                        relationName={relationName}
                        inputBoxes={inputBoxes}
                        setRelationName={setRelation}
                        updateInputBoxes={updateInputBoxes}
                        resetAll={resetAll}
                        removeAttribute={removeAttribute}
                        updateCurrentIndex={updateCurrentIndex}
                        setDisableBox={setDisableConstraintBox}
                        setCurrentCell={setCurrentCell}
                        currentCell={currentCell}
                    />
                    <hr className='ms-5 me-5'/>
                    <div className="row col-12">
                        <div className={`col-lg-8 col-md-8 col-sm-12 ${styles['fd-list']}`}>
                            <FdsList
                                inputBoxes={inputBoxes}
                                isOpen={true}
                            />
                        </div>
                        <div className={`col-lg-4 col-md-8 col-sm-12 me-0 ${styles.suggestion}`}>
                            <Suggestion
                                isOpen={false}
                            />
                        </div>
                    </div>
                </div>
                <DependencyNConstraint
                    inputBoxes={inputBoxes}
                    currentIndex={currentIndex}
                    updateInputBoxes={updateInputBoxes}
                    removeAttribute={removeAttribute}
                    disableBox={disableConstraintBox}
                    setCurrentCell={setCurrentCell}
                />
            </div>
        </section>
    );
}

export default MainTool;