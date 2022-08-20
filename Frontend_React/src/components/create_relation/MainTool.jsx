import React, {useEffect, useState} from "react";
import styles from './css/mainTool.module.css'
import './css/hr.css';
import CreateRelation from "./relation/CreateRelation";
import DependencyNConstraint from "./dependency_constraint/DependencyNConstraint";
import FdsList from "./fds_list/FdsList";
import {get_inputBoxes, inputBoxes_data} from "../../store/inputBoxes_dataStore";
import Suggestion from "./fds_list/Suggestion";
import UploadFile from "./UploadFile";
import Loader from "../full_page_loader/loader";

const MainTool = (props) => {
    const [inputBoxes, setInputBoxes] = useState([]);
    const [relationName, setRelationName] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [disableConstraintBox, setDisableConstraintBox] = useState(false);
    const [currentCell, setCurrentCell] = useState(false);
    const [isFdMine, setIsFdMine] = useState(false);
    const [loading, setLoading] = useState(false);

    const data = inputBoxes_data.getRawState()

    useEffect(() => {
        setInputBoxes(data.inputBoxes)
        setRelationName(data.relationName)
    }, []);

    useEffect(() => {
        if (isFdMine) {
            const data = inputBoxes_data.getRawState();
            setInputBoxes(data.inputBoxes);
            setRelationName(data.relationName);
            setIsFdMine(false);
            setLoading(false);
        }
    }, [isFdMine]);

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
        let val = newInputBoxes[index].id;
        newInputBoxes.splice(index, 1)
        for (let i = 0; i < newInputBoxes.length; i++) {
            newInputBoxes[i] = {...newInputBoxes[i]}
            newInputBoxes[i].dependency = [...newInputBoxes[i].dependency]
            newInputBoxes[i].dependency = newInputBoxes[i].dependency.map(dep => dep.filter(value => value !== val))
        }
        updateInputBoxes(newInputBoxes);
    }

    const updateCurrentIndex = (index) => {
        setCurrentIndex(index);
    }
    return (
        <section className={`${styles.main}`}>
            {loading &&
            <Loader
                loading={loading}
            />
            }
            <UploadFile
                setIsFdMine={setIsFdMine}
                setLoader={setLoading}
            />
            {/*<div className="my-hr container mt-2 mb-0">*/}
            {/*<div className="col-12 d-inline-flex">*/}

            {/*</div>*/}
            {/*</div>*/}
            <div className="col-12 mt-2">
                <div className="container">
                    <div className="d-inline-flex col-12">
                        <hr className='my-hr-or me-1'/>
                        <span className='hr-content'>OR</span>
                        <hr className='my-hr-or ms-1 me-2'/>
                    </div>
                </div>
            </div>

            <div className="m row col-12">
                <div className={`col-lg-8 col-md-10 col-sm-12 ${styles['__create-relation']}`}>
                    <CreateRelation
                        relationName={relationName}
                        inputBoxes={inputBoxes}
                        setRelationName={setRelation}
                        updateInputBoxes={updateInputBoxes}
                        removeAttribute={removeAttribute}
                        updateCurrentIndex={updateCurrentIndex}
                        setDisableBox={setDisableConstraintBox}
                        setCurrentCell={setCurrentCell}
                        currentCell={currentCell}
                        props_data={props.props_data}
                        onPreliminaryCheckClick={props.onPreliminaryCheckClick}
                        setShowNavbarContent={props.setShowNavbarContent}
                    />
                    <hr className='ms-5 me-5'/>
                    <div className="row ms-2 ">
                        <div className={`col-lg-6 col-md-12 col-sm-12 m-0 p-0 ${styles['fd-list']}`}>
                            <FdsList
                                inputBoxes={inputBoxes}
                                isOpen={true}
                            />
                        </div>
                        <div className={`col-lg-6 col-md-12 col-sm-12 m-0 p-0 ${styles.suggestion}`}>
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