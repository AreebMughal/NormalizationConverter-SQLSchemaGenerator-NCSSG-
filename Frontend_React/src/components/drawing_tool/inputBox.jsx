import {Component} from "react";
import '../../assets/css/inputBox.css';

class InputBox extends Component {

    render() {
        const {inputBox, onChange, onClick, width, onFocus} = this.props;

        return (
            <div className=''>
                <input
                    type="text"
                    value={inputBox.value}
                    placeholder='Attribute'
                    className={this.getClassName(inputBox)}
                    id={inputBox.id}
                    onChange={onChange}
                    onClick={() => onClick(inputBox)}
                    style={{width: width}}
                    maxLength={20}
                    autoFocus={true}
                    onFocus={onFocus}
                />
            </div>
        );
    }


    getClassName(inputBox) {
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
}

export default InputBox;