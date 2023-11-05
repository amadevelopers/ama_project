import React from 'react'
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/homePage";
import LoginPage from '../pages/loginPage';

import AdminHomePage from '../pages/adminHomePage';
// import CseDept from '../pages/CseDept';
import Purchase from '../pages/purchase';
import CseDept from '../pages/cseDeptNew';

import CreateAsset from '../pages/CreateAsset';
function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/"  element={<HomePage/>} />
                <Route path="/login"  element={<LoginPage/>} />
                <Route path="/admin-home" element={<AdminHomePage/>}/>
                <Route path="/purchase" element={<Purchase/>}/>                
                <Route path="/create-asset" element={<CreateAsset/>}/>

                {/* <Route path="/:deptName/:deptId" element={<CseDept/>}/> */}
                <Route path="/:deptName" element={<CseDept/>}/>

            </Routes>
        </div>
    )
}

export default AppRoutes