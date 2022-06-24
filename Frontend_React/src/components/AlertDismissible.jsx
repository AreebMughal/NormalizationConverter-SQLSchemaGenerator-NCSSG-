import {useEffect, useState} from "react";
import '../assets/css/alert.css';

function AlertDismissible(props) {
    const [show, setShow] = useState(null);

    function triggerClose() {
        setShow(false);
    }

    useEffect(() => {
        setShow(props.visibility)
        const timer = setTimeout(() => setShow(false), 3000);
        return () => clearTimeout(timer);
    }, [props.visibility])

    if (show) {
        return (
            <div className='row col-12'>
                <center>
                <div className="mt-2 col-lg-4 col-md-6 col-sm-8">
                    <div className="alert alert-danger"  role="alert">
                        {props.alertMsg}
                        <span className='dismissible-button float-end' onClick={triggerClose}>x</span>
                    </div>
                </div>
                </center>
            </div>
        );
    }
    return ""
}

export default AlertDismissible;