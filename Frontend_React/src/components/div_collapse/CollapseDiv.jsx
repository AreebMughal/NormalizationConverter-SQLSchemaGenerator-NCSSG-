import {useEffect, useState} from "react";
import {Button, Fade} from "react-bootstrap";
import './collapseDiv.css';
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CollapseDiv = (props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.isOpen);
    }, [props.isOpen]);

    console.log(props.isOpen)
    return (
        <>
            <div className="__card-collapse-header">
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
                <div className="__my-card">
                    <div id="example-fade-text">
                        {props.children}
                    </div>
                </div>
            </Fade>
        </>
    );
}

export default CollapseDiv;