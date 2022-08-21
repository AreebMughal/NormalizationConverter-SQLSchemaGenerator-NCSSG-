import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import CollapseDiv from "../../div_collapse/CollapseDiv";
const FdsList = (props) => {

    const {inputBoxes} = props;

    return (
        <div className="mb-5 ms-2">
            {/*<h5></h5>*/}
            <CollapseDiv
                cardTitle={'Current Functional Dependencies:'}
                isOpen={props.isOpen}
            >
            <ol className='ps-3'>
                {inputBoxes.map(input => {
                    const dep = input.dependency
                    if (dep !== undefined) {
                        return dep.map((d, i) => {
                            if (d.length > 0) {
                                const list = d.map(id => inputBoxes.filter(inputBox => id === inputBox.id)[0].value);
                                return <li key={i}>{`{${list.toString().replaceAll(',', ', ')}}`} <FontAwesomeIcon
                                    icon={faArrowRight} className="ms-1 me-1"/>
                                    {`{${input.value}}`}</li>
                            }
                            return ''
                        })
                    } else {
                        return ''
                    }
                })}
            </ol>
            </CollapseDiv>
        </div>
    );
}

export default FdsList;