import FdList from "../drawing_tool/fdList";
import my_data from "../../store/data";

const MinimalCoverModal = (props) => {
    return (
        <div className={`card ${props.cardClass} `}>
            <div className={`card-header ${props.headerClass}`}>
                {props.cardHeader}
            </div>
            <div className="card-body">
                <FdList
                    inputBoxes={my_data.getRawState().inputBoxes}
                />
            </div>
        </div>
    );
}

export default MinimalCoverModal;