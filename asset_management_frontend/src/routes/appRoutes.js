import React from 'react'
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/homePage";
import LoginPage from '../pages/loginPage';

import AdminHomePage from '../pages/adminHomePage';
import CseDept from '../pages/CseDept';
function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/"  element={<HomePage/>} />
                <Route path="/login"  element={<LoginPage/>} />
                <Route path="/admin-home" element={<AdminHomePage/>}/>
                <Route path="/:deptname/:deptId" element={<CseDept/>}/>

            </Routes>
        </div>
    )
}

export default AppRoutes