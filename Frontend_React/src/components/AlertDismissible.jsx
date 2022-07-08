import React, {useEffect, useState} from "react";
import '../assets/css/alert.css';

function AlertDismissible(props) {
    const [show, setShow] = useState(null);

    function triggerClose() {
        setShow(false);
        props.setVisible(false);
    }

    useEffect(() => {
        setShow(props.visibility)
        // const timer = setTimeout(() => setShow(false), 3000);
        // return () => clearTimeout(timer);
    }, [props.visibility])

    if (show) {
        return (
            /*<div className='col-12 __alert'>
                <center>
                <div className="mt-2 col-lg-4 col-md-6 col-sm-8 __alert">
                    <div className="alert alert-danger "  role="alert">
                        {props.alertMsg}
                        <span className='dismissible-button float-end' onClick={triggerClose}>x</span>
                    </div>
                </div>
                </center>
            </div>*/
            <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="alert alert-danger float-end" role="alert">
                    {props.alertMsg}
                    <span className='dismissible-button float-end' onClick={triggerClose}>x</span>
                </div>
            </div>
        );
    }
    return ""
}

export default AlertDismissible;