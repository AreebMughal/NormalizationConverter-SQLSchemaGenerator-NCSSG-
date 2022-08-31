import React, {useState} from "react";
import PreliminaryCheck from "./PreliminaryCheck";
import SaveData from "./SaveData";
import LoadData from "./LoadData";
import RelationalMapping from "../../relational_mapping/RelationalMapping";

const RelationButtons = (props) => {

    const api_url = 'http://127.0.0.1:5000/relationalMapping';

    const addCellClickHandler = (e) => {
        props.addCell({
            id: props.inputBoxes[props.inputBoxes.length - 1].id + 1,
            value: '',
            width: 90,
            dependency: [[]],
            primary: false,
            multiValue: false,
        });
    }

    const deleteCellClickHandler = (e) => {
        props.removeCell();
    }

    const resetAllClickHandler = (e) => {
        props.resetAll();
    }
    const [isRelMapTrigger, setIsRelMapTrigger] = useState(false);

    return (
        <div className="buttons ms-2 mt-3">
            {/*<RelationalMapping
                relMapModal={relMapModal}
                relMapLoader={relMapLoader}
                visibility={visibility}
                error={error}
                setRelMapModal={setRelMapModal}
                setRelMapLoader={setRelMapLoader}
                setVisibility={setVisibility}
                title={'Relational Mapping'}
                url={api_url}
            />*/}
            <RelationalMapping
                isRelMapTrigger={isRelMapTrigger}
                setIsRelMapTrigger={setIsRelMapTrigger}
                title={'Relational Mapping'}
                url={api_url}
            />
            <button
                className='btn btn-sm btn-primary text-white btn-style me-1'
                onClick={addCellClickHandler}
            >
                ＋
            </button>
            <button
                className='btn btn-sm btn-danger text-white btn-style'
                onClick={deleteCellClickHandler}
            >
                -
            </button>
            <button
                className='btn btn-sm btn-secondary ms-2'
                onClick={resetAllClickHandler}
            >
                Reset
            </button>
            <div className="float-end">
                <PreliminaryCheck
                    onPreliminaryCheckClick={props.onPreliminaryCheckClick}
                    setShowNavbarContent={props.setShowNavbarContent}
                    setSuggestion={props.setSuggestion}
                />
                <button
                    className='btn btn-sm btn-info ms-2 text-white'
                    // onClick={relationalMappingClickHandler}
                    onClick={() => setIsRelMapTrigger(true)}
                >
                    View Diagram
                </button>
                <SaveData/>
                <LoadData
                    setIsLoadWork={props.setIsLoadWork}
                />
            </div>
        </div>);
}

export default RelationButtons;