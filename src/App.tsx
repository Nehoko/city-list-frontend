import React from 'react';
import './App.css';
import CityTable from "./components/CityTable"
import UserInfo from "./components/UserInfo";
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";

function App() {
    return (<Routes>
        <Route path="/" element=
            {<>
                <UserInfo/>
                <CityTable/>
            </>}
        />
        <Route path="/login" element={<Login/>}
        />
    </Routes>)
}

export default App;
