import React from 'react'
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/homePage";
import CseDept from '../pages/cseDept';
function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/home"  element={<HomePage/>} />
                <Route path="/csedept"  element={<CseDept/>} />
            </Routes>
        </div>
    )
}

export default AppRoutes