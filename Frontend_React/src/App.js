import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NF_1 from "./components/normal_forms/NF_1";
import Navbar from "./components/Navbar";
import MinimalCover from "./components/minimalCover";
import NF_2 from "./components/normal_forms/NF_2";
import my_data from "./store/data";
import NF_3 from "./components/normal_forms/NF_3";
import Home from "./components/home";
import SqlSchemaGenerator from "./components/sql_schema_generator/sqlSchemaGenerator";
import MainTool from "./components/create_relation/MainTool";

function App() {

    const [showNavbarContent, setShowNavbarContent] = useState(false);
    const [visible, setVisible] = useState(false);
    const [list, setList] = useState(null);
    const [msg, setMsg] = useState('');

    const checkRelationName = (relationName) => {
        if (relationName.trim().length === 0) {
            setMsg('Please enter relation name!');
            return false;
        }
        return true;
    }


    function checkPrimary(inputBoxes) {
        const isHavePrimary = inputBoxes.map(input => input.value.trim().length !== 0 && input.primary).includes(true)
        if (!isHavePrimary) {
            setMsg('Please define at least one primary key!')
        }
        return isHavePrimary;
    }

    function checkDependency(inputBoxes) {
        let res = inputBoxes.map((input) => {
            let val = ''
            if (input.value.trim().length > 0) {
                if (!input.primary) {
                    val += input.dependency.map(dep => dep.length > 0)
                } else {
                    val += true
                }
            }
            return val;
        }).map(r => r.includes('true'));
        // console.log(res);
        if (res.includes(false)) {
            const indices = res.map((r, i) => !r ? i : '').filter(r => r.toString().length !== 0);
            // console.log(indices);
            setList(indices);
            setMsg('Please define each attribute\'s dependency.');
            return false;
        }
        return true;
    }

    const preliminaryCheckClickHandler = (e) => {
        setVisible(false)
        setList([]);
        const inputBoxes = my_data.getRawState().inputBoxes;
        const relationName = my_data.getRawState().relationName;
        if (inputBoxes.length > 0) {
            if (checkRelationName(relationName) && checkPrimary(inputBoxes) && checkDependency(inputBoxes)) {
                setShowNavbarContent(true);
            } else {
                setVisible(true);
                setShowNavbarContent(false);
                e.preventDefault();
            }
        }
    }
    return (
        <div>
            <BrowserRouter>
                <Navbar
                    showNavbarContent={showNavbarContent}
                    onClick={preliminaryCheckClickHandler}
                />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/NC-SSG/DrawingTool" element={<MainTool
                        setShowNavbarContent={setShowNavbarContent}
                        props_data={{errorMsg:msg, visible, setVisible, list: list}}
                    />}/>
                    <Route path="/NC-SSG/MinimalCover" element={<MinimalCover/>}/>
                    <Route path="/NC-SSG/1NF" element={<NF_1/>}/>
                    <Route path="/NC-SSG/2NF" element={<NF_2/>}/>
                    <Route path="/NC-SSG/3NF" element={<NF_3/>}/>
                    <Route path="/NC-SSG/SQLSchema" element={<SqlSchemaGenerator/>}/>
                    {/*<Route path="/NC-SSG/" element={<MainTool/>}/>*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
