import './relationName.css';
import {useEffect, useState} from "react";

const RelationName = (props) => {
    const [relName, setRelName] = useState('');

    useEffect(() => {
        return () => {
            setRelName(props.name)
        };
    }, [props.name]);

    const relationNameChangeHandler = (event) => {
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!specialChars.test(event.target.value)) {
            setRelName(event.target.value)
            props.setRelationName(event.target.value)
        }
    }

    const relationKeyDownHandler = (event) => {
        if (event.key === ' ') {
            event.preventDefault()
        }
    }
    const relationNameFocusHandler = (e) => {
        props.setDisableBox(true);
    }


    return (
        <div className="col-6">
            <label
                htmlFor="name"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 "
            >
                Relation Name:
            </label>
            <input
                type="text"
                name="name"
                placeholder=""
                onChange={relationNameChangeHandler}
                onKeyDown={relationKeyDownHandler}
                className="ms-1"
                value={props.name}
                maxLength={22}
                onFocus={relationNameFocusHandler}
            />
        </div>
    );
}

export default RelationName;
