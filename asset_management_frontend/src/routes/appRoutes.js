import React from 'react'
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/homePage";
import LoginPage from '../pages/loginPage';
import CseDept from '../pages/cseDept';
import AdminHomePage from '../pages/adminHomePage';
function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/"  element={<HomePage/>} />
                <Route path="/login"  element={<LoginPage/>} />
                <Route path="/admin-home" element={<AdminHomePage/>}/>
                <Route path="/cse"  element={<CseDept/>} />
            </Routes>
        </div>
    )
}

export default AppRoutes