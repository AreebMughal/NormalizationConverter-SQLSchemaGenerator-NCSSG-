import React, {useState} from "react";
import PreliminaryCheck from "./PreliminaryCheck";
import axios from "axios";
import my_data from "../../../store/data";
import SaveData from "./SaveData";
import LoadData from "./LoadData";
import ImageModal from "../../relational_mapping/ImageModal";

const RelationButtons = (props) => {
    const [relMapModal, setRelMapModal] = useState(false);
    const [relMapLoader, setRelMapLoader] = useState(false);


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

    const relationalMappingClickHandler = (e) => {
        axios.post('http://127.0.0.1:5000/relationalMapping',
            {inputBoxes: my_data.getRawState().inputBoxes, relationName: my_data.getRawState().relationName})
            .then(res => {
                console.log(res.data);
                if (res.data !== 0) {
                    setRelMapModal(true);
                }
                setRelMapModal(true);

            }).catch(error => {
            alert('Server is not running => ' + error)
        });
    }

    return (
        <div className="buttons ms-2 mt-1">
            <ImageModal
                imgName='/1NF.png'
                show={relMapModal}
                setShow={setRelMapModal}
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
                />
                <button
                    className='btn btn-sm btn-info ms-2 text-white'
                    onClick={relationalMappingClickHandler}
                >
                    View Diagram
                </button>
                <SaveData/>
                <LoadData
                    setIsLoadWork={props.setIsLoadWork}
                />
            </div>
        </div>
    );
}

export default RelationButtons;