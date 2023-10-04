import React from 'react'
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/homePage";
function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/home"  element={<HomePage/>} />
            </Routes>
        </div>
    )
}

export default AppRoutes