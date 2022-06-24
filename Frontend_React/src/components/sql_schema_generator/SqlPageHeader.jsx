import React, {useState} from 'react';

const SqlPageHeader = (props) => {
    const [level, setLevel] = useState(null);
    const nfLevelClickHandler = () => {
        props.onChange(level)
    }
    const nfLevelChangeHandler = (event) => {
        setLevel(event.target.value)
    }
    return (
        <div className='d-flex flex-wrap sql-page-header my-form'>
            <div className='card-title'>
                <h6>At what level you want to generate SQL Schema? </h6>
            </div>
            <div className='d-flex ms-3'>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"
                           value='NF3' onChange={nfLevelChangeHandler}/>
                    <label className="nf-check-label me-4" htmlFor="flexRadioDefault3">
                        3-NF
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"
                           value='BCNF' onChange={nfLevelChangeHandler}/>
                    <label className="nf-check-label  me-4" htmlFor="flexRadioDefault4">
                        BC-NF
                    </label>
                </div>
                <div className="generate-button">
                    <button className='btn btn-sm btn-outline-secondary no-outline ps-3 pe-3 pt-1 pb-1 generate_btn'
                            onClick={nfLevelClickHandler}>
                        Load Data
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SqlPageHeader;