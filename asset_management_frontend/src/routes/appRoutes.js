import React from 'react'
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/homePage";
import LoginPage from '../pages/loginPage';
function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/"  element={<HomePage/>} />
                <Route path="/login"  element={<LoginPage/>} />
            </Routes>
        </div>
    )
}

export default AppRoutes