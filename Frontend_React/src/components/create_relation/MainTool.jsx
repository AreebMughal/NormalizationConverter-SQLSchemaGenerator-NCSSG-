import React, {useEffect, useState} from "react";
import styles from './css/mainTool.module.css'
import './css/hr.css';
import CreateRelation from "./relation/CreateRelation";
import DependencyNConstraint from "./dependency_constraint/DependencyNConstraint";
import FdsList from "./fds_list/FdsList";
import {get_inputBoxes, inputBoxes_data, suggestion_store} from "../../store/inputBoxes_dataStore";
import Suggestion from "./fds_list/Suggestion";
import UploadFile from "./UploadFile";
import Loader from "../full_page_loader/loader";
import HrOR from "../general_UI/hrOR";
import LoadImage from "../../firebase/LoadImage";
import ImageModal from "../relational_mapping/ImageModal";

const MainTool = (props) => {
    const [inputBoxes, setInputBoxes] = useState([]);
    const [relationName, setRelationName] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [disableConstraintBox, setDisableConstraintBox] = useState(false);
    const [currentCell, setCurrentCell] = useState(false);
    const [isFdMine, setIsFdMine] = useState(false);
    const [isLoadWork, setIsLoadWork] = useState(false);
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState('');

    const data = inputBoxes_data.getRawState()

    useEffect(() => {
        setInputBoxes(data.inputBoxes);
        setRelationName(data.relationName);
        setSuggestion(suggestion_store.getRawState().value);
    }, []);

    useEffect(() => {
        if (isFdMine || isLoadWork) {
            const data = inputBoxes_data.getRawState();
            setInputBoxes(data.inputBoxes);
            setRelationName(data.relationName);
            setIsFdMine(false);
            setIsLoadWork(false);
            setLoading(false);
        }
    }, [isFdMine, isLoadWork]);

    useEffect(() => {
        suggestion_store.update(s => {
            s.value = suggestion
        });
    }, [suggestion]);


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
            { loading && <Loader loading={loading} message={<span>Extracting Functional Dependencies <br/>
                    Please wait...</span>} /> }
            <UploadFile
                setIsFdMine={setIsFdMine}
                setLoader={setLoading}
                setSuggestion={setSuggestion}
            />
            <HrOR/>
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
                        setSuggestion={setSuggestion}
                        setIsLoadWork={setIsLoadWork}
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
                                isOpen={suggestion !== ''}
                                suggestion={suggestion}
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
            {/*<LoadImage />*/}

        </section>
    );
}

export default MainTool;