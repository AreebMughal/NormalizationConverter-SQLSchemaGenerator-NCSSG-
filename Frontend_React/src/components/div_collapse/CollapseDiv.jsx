import {useState} from "react";
import {Button, Fade} from "react-bootstrap";
import './collapseDiv.css';
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CollapseDiv = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="__card-collapse-header col-6">
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-fade-text"
                    aria-expanded={open}
                    className="btn-sm w-100 __card-title"
                >
                    <span className="float-start">{props.cardTitle}</span>
                    <span className="float-end">
                        <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} className="ms-1 me-1"/>
                    </span>
                </Button>
            </div>

            <Fade in={open}>
                <div className="__my-card col-6">

                    <div id="example-fade-text">
                        {/*Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus*/}
                        {/*terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer*/}
                        {/*labore wes anderson cred nesciunt sapiente ea proident.*/}
                        {props.children}
                    </div>
                </div>
            </Fade>
        </>
    );
}

export default CollapseDiv;