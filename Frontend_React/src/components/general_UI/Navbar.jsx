import React from 'react';
import {NavLink} from "react-router-dom";
import 'bootstrap'
import "../../assets/css/navbar.css"

function Navbar(props) {
    const {showNavbarContent} = props;

    return (
        <React.Fragment>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark m-0">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <NavLink className="navbar-brand ms-2" to="/">NC SSG</NavLink>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item me-0">
                                <NavLink className="nav-link" to="/NC-SSG/DrawingTool">
                                    <span className='me-1 circled-number'>&#9312;</span>
                                    Drawing Tool
                                </NavLink>
                            </li>
                            {showNavbarContent &&
                                <React.Fragment>
                                    <li className="nav-item me-0">
                                        <NavLink className="nav-link" to="/NC-SSG/MinimalCover" onClick={props.onClick}>
                                            <span className='me-1 circled-number'>&#9313;</span>
                                            Minimal Cover
                                        </NavLink>
                                    </li>
                                    <li className="nav-item me-0">
                                        <NavLink className="nav-link" to="/NC-SSG/1NF" onClick={props.onClick}>
                                            <span className='me-1 circled-number'>&#9314;</span>
                                            Show 1-NF
                                        </NavLink>
                                    </li>
                                    <li className="nav-item me-0">
                                        <NavLink className="nav-link" to="/NC-SSG/2NF" onClick={props.onClick}>
                                            <span className='me-1 ms-0 p-0 circled-number'>&#9315;</span>
                                            Show 2-NF
                                        </NavLink>
                                    </li>
                                    <li className="nav-item me-0">
                                        <NavLink className="nav-link" to="/NC-SSG/3NF" onClick={props.onClick}>
                                            <span className='me-1 circled-number'>&#9316;</span>
                                            Show 3-NF
                                        </NavLink>
                                    </li>
                                    <li className="nav-item me-0">
                                        <NavLink className="nav-link" to="/NC-SSG/BCNF" onClick={props.onClick}>
                                            <span className='me-1 circled-number'>&#9315;</span>
                                            BCNF
                                        </NavLink>
                                    </li>
                                    <li className="nav-item me-0">
                                        <NavLink className="nav-link" to="/NC-SSG/SQLSchema">
                                            <span className='me-1 circled-number'>&#9316;</span>
                                            SQL Schema
                                        </NavLink>
                                    </li>
                                </React.Fragment>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Navbar