import FdList from "../drawing_tool/fdList";
import my_data from "../../store/data";
import FdsList from "../create_relation/fds_list/FdsList";
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";

const MinimalCoverModal = (props) => {
    // const inputBoxes = inputBoxes_data.getRawState().inputBoxes;
    const inputBoxes = my_data.getRawState().inputBoxes;

    // inputBoxes.map(attr => {
    //     console.log(attr.dependency.toString(), '->', attr.value)
    //     return ''
    // })

    return (
        <div className={`card ${props.cardClass} `}>
            <div className={`card-header ${props.headerClass}`}>
                {props.cardHeader}
            </div>
            <div className="card-body pb-0">
                {/*<FdsList*/}
                {/*    inputBoxes={inputBoxes}*/}
                {/*/>*/}
                {(props.fdList) &&
                <FdList
                    inputBoxes={inputBoxes}
                />
                }
                {(props.step3 !== undefined) &&
                    props.step3
                }
            </div>
        </div>
    );
}

export default MinimalCoverModal;