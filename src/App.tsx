import React from 'react';
import './App.css';
import CityTable from "./components/CityTable"
import UserInfo from "./components/UserInfo";
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import CityEditor from "./components/CityEditor";

function App() {
    return (<Routes>
        <Route path="/" element=
            {<>
                <UserInfo/>
                <CityTable/>
            </>}
        />
        <Route path="/login" element={<Login/>}/>
        <Route path="/update-city" element={<CityEditor/>}/>
    </Routes>)
}

export default App;
