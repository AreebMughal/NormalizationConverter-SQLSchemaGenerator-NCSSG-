import React, {useEffect, useState} from "react";
import Main from "./components/drawing_tool/main";
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

    const [visible, setVisible] = useState(false);
    const [list, setList] = useState(null);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
    })

    function checkPrimary(inputBoxes) {
        let bool = true;
        const isHavePrimary = inputBoxes.map(input => input.primary).includes(true)
        if (!isHavePrimary) {
            setMsg('Please define at least one primary key.')
            setVisible(true);
            bool = false;
        }
        return bool;
    }

    function click(e) {
        setVisible(false)
        const inputBoxes = my_data.getRawState().inputBoxes;
        if (inputBoxes.length > 0) {
            if (checkPrimary(inputBoxes)) {
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
                })
                // console.log(res)
                res = res.map(r => {
                    return r.includes('true') ? 'true' : 'false'
                })
                // console.log(res)
                if (res.includes( 'false')) {
                    setVisible(true)
                    const r = res.map((r, i) => r === 'false' ? i : -1)
                    // console.log(r)
                    setList(r)
                    setMsg('Please define each attribute\'s dependency.')
                    e.preventDefault()
                }
            } else {
                e.preventDefault();
            }
        }
    }


    return (
        <div>
            <BrowserRouter>
                <Navbar
                    onClick={click}
                    visible={visible}
                    alertMsg={msg}
                />
                <Routes so={list}>
                    <Route path="/" element={<Home some={list}
                    />}/>
                    <Route path="/NC-SSG/DrawingTool" element={<Main some={list}
                    />}/>
                    <Route path="/NC-SSG/MinimalCover" element={<MinimalCover/>}/>
                    <Route path="/NC-SSG/1NF" element={<NF_1/>}/>
                    <Route path="/NC-SSG/2NF" element={<NF_2/>}/>
                    <Route path="/NC-SSG/3NF" element={<NF_3/>}/>
                    <Route path="/NC-SSG/SQLSchema" element={<SqlSchemaGenerator/>}/>
                    <Route path="/NC-SSG/" element={<MainTool/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
