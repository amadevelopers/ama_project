import React from 'react'
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/homePage";
import LoginPage from '../pages/loginPage';

import AdminHomePage from '../pages/adminHomePage';
// import CseDept from '../pages/CseDept';
import Purchase from '../pages/purchase';
import CseDept from '../pages/cseDeptNew';
import Dashboard from '../pages/Dashboard';

import CreateAsset from '../pages/CreateAsset';
function AppRoutes() {
    return (
        <div>
            <Routes>
                {/* <Route path="/"  element={<HomePage/>} /> */}
                <Route path="/" element={<AdminHomePage/>}/>
                <Route path="/login"  element={<LoginPage/>} />
                <Route path="/:deptName" element={<CseDept/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>                

            </Routes>
        </div>
    )
}

export default AppRoutes