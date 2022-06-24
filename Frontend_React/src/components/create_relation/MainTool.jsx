import React, {useEffect, useState} from "react";
import my_data from "../../store/data";
import styles from './css/mainTool.module.css'
import CreateRelation from "./CreateRelation";
import DependencyNConstraint from "./dependency_constraint/DependencyNConstraint";

const MainTool = () => {
    const [inputBoxes, setInputBoxes] = useState([]);
    const [relationName, setRelationName] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const data = my_data.getRawState()

    useEffect(() => {
        setInputBoxes(data.inputBoxes)
        setRelationName(data.relationName)
    }, []);

    useEffect(() => {
        my_data.update(s => {
            s.inputBoxes = inputBoxes
            s.relationName = relationName
        })
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
                <CreateRelation
                    relationName={relationName}
                    inputBoxes={inputBoxes}
                    setRelationName={setRelation}
                    updateInputBoxes={updateInputBoxes}
                    resetAll={resetAll}
                    removeAttribute={removeAttribute}
                    updateCurrentIndex={updateCurrentIndex}
                />
                <DependencyNConstraint
                    inputBoxes={inputBoxes}
                    currentIndex={currentIndex}
                    updateInputBoxes={updateInputBoxes}
                    removeAttribute={removeAttribute}
                />
            </div>
            <hr className='ms-5 me-5'/>
            {/*
                <div className="Fds-list ms-3">
                    <FdList
                        key={1}
                        inputBoxes={this.state.inputBoxes}
                    />
                </div>
                */}

        </section>
    );
}

export default MainTool;