import {useState, useEffect} from "react";
import './css/TableCell.css';

const TableCell = (props) => {
    const [width, setWidth] = useState(90);
    useEffect(() => {
        if (props.currentCell) {
            document.getElementById('0').focus();
            props.setCurrentCell(false);
        }
    }, [props.currentCell]);

    const getClassName = (inputBox) => {
        // let classname = 'inputBox red-border alert-danger mt-3 '
        let classname = 'inputBox mt-3 '
        if (inputBox.primary && inputBox.multiValue)
            classname += 'ib-underline ib-dash';
        else if (inputBox.multiValue)
            classname += 'ib-dash';
        else if (inputBox.primary)
            classname += 'ib-underline ';
        return classname;
    }

    const cellValueChangeHandler = (event) => {
        const target = event.target
        const len = target.value.length
        let width = (len * 10) - (len * .2) + 2;
        if (width < 90)
            width = 90
        setWidth(width);
        // setValue(target.value)
        setCellBorder(target, target.id)
        props.updateCellValue(target.id, target.value)
    }

    const setCellBorder = (target, id) => {
        const res = props.inputBoxes.map((input, index) =>
            index !== parseInt(id) && input.value.trim().length !==0 && input.value === target.value.trim()
        );
        if (res.includes(true)) {
            target.classList.add('my-border-danger');
            props.setDisableBox(true);
            props.ref_alert_msg.current.classList.remove('visually-hidden')
        } else {
            target.classList.remove('my-border-danger');
            props.setDisableBox(false);
            props.ref_alert_msg.current.classList.add('visually-hidden')
        }
    }
    const cellKeyDownHandler = (event) => {
        if (event.key === ' ') {
            event.preventDefault();
        }
    }

    const cellFocusHandler = (e) => {
        // e.target.classList.add('my-border-focused')
        setCellBorder(e.target, e.target.id)
        props.updateCurrentIndex(e.target.id);
    }

    const cellFocusOutHandler = (e) => {
        e.target.classList.remove('my-border-danger')
    }
    // console.log('render cell')
    return (
        <div className='my-fields'>
            <input
                type="text"
                value={props.value}
                placeholder='Attribute'
                style={{width: width}}
                maxLength={20}
                id={props.index}
                autoFocus={true}
                className={getClassName(props.inputBox)}
                onChange={cellValueChangeHandler}
                onKeyDown={cellKeyDownHandler}
                onFocus={cellFocusHandler}
                onBlur={cellFocusOutHandler}
            />
        </div>
    );


}

export default TableCell;