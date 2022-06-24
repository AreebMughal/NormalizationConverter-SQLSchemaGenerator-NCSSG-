import {useState} from "react";
import ErrorModal from "../modal/ErrorModal";

const SqlPageFooter = ({data}) => {
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const setShow = () => setShowModal(false)

    const sqlSchemaClickHandler = () => {

        console.log('first')
        for (let i = 0; i < data.length; i++) {
            const rel = data[i]
            if (rel.relationName.trim().length === 0) {
                setShowModal(true);
                setErrorMsg('Relation Name Missing')
            } else {
                console.log('else')
                rel.attributes.map((attr, index) => {
                    console.log('in map - bef')
                    if (attr.value.trim().length === 0) {
                        setShowModal(true);
                        setErrorMsg('Attribute Name Missing')

                    }
                    console.log('in map - aff')

                    return true;
                })
            }
        }
        // console.log('some')
    }

    return (
        <div className='float-end m-3'>
            <button className='btn btn-primary' onClick={sqlSchemaClickHandler}>Generate SQL Schema</button>

        </div>
    );
}

export default SqlPageFooter;