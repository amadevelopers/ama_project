import React from 'react'
import { Route, Routes } from "react-router-dom";

import LoginPage from '../pages/loginPage';

import AdminHomePage from '../pages/adminHomePage';
// import CseDept from '../pages/CseDept';
import Purchase from '../pages/purchase';
import CseDept from '../pages/cseDeptNew';
import Dashboard from '../pages/dashboard';

import CreateAsset from '../pages/CreateAsset';
import { AddAsset } from '../pages/AddAsset/addAsset';
function AppRoutes() {
    return (
        <div>
            <Routes>
                {/* <Route path="/" element={<AdminHomePage/>}/> */}
                <Route path="/"  element={<LoginPage/>} />
                <Route path="/:deptName" element={<CseDept/>}/>
                {/* <Route path="/dashboard/:value" element={<Dashboard/>}/>                 */}
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/purchases" element={<Purchase/>}/>
                <Route path="/createAssetType" element={<CreateAsset/>}/>
                <Route path="/addAsset" element={<AddAsset/>}/>
                <Route path="/viewAsset" element={<AddAsset/>}/>
                <Route path="/create-user" element={<LoginPage/>}/>

            </Routes>
        </div>
    )
}

export default AppRoutes