import React, { useState, useEffect } from 'react'
import { Form } from 'react-router-dom'
import '../css/adminHomePage.css'
import Cards from '../components/cards/cards'
import { AddAsset } from './AddAsset/addAsset'
import CreateAsset from './CreateAsset'
import Header from '../components/header/header'
import Purchase from './purchase'
import axios from 'axios'

function AdminHomePage() {

    const [adminAction, setadminAction] = useState('')
    const [departmentList,setdepartmentList] = useState([{}]);
    const handleAdminAction = async (e) => {
        await setadminAction(e.target.value);
        if(adminAction === 'invoice')
        {
            try{
                const response = await axios.get('/GetVendors')
                console.log(response.data)
            }catch(error){
                console.log(error.message)
            }
        }
        if(adminAction === 'viewAsset'){
            try{
                const deptList = await axios.get('/GetBuildings')
                setdepartmentList(deptList.data)
                console.log(departmentList)
                
            }catch(error){
                console.log(error.message)
            }
        }
    }

    const [dept, setdept] = useState('')
    const [userType, setuserType] = useState('')
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')

    const handleDeptSelection = (e) => {
        setdept(e.target.value)
    }
    const handleUserTypeSelection = (e) => {
        setuserType(e.target.value)
    }
    const handleUserNameChange = (e) => {
        setuserName(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setpassword(e.target.value)
    }

    const handleUserCreationForm = async (e) => {
        e.preventDefault();
        let formdata = new FormData(e.target);
        await formdata.append("dept", dept);
        await formdata.append("userType", userType);
        await formdata.append("userName", userName);
        await formdata.append("password", password);
        await console.log("Form values: ", formdata.get(''))

        // new Response(formdata).text().then(console.log)
        const formDataToObject = (formData) => {
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            return data;
        };

        // Call this function to convert your FormData to a JavaScript object
        const formDataAsObject = formDataToObject(formdata);

        console.log("Form values as object: ", formDataAsObject);

    }


    useEffect(() => {

    }, [])
    return (
        <div className='admin-main-container'>
            <Header/>
            <div className='admin-action-selection'>
                <h2>Admin Actions:</h2>
                <div className='admin-actions' >
                    <div className='action-selector'>
                        <input type='radio' name='adminAction' value='invoice' onChange={handleAdminAction} />
                        <label htmlFor='adminAction'>Purchases(Enter invoice)</label>
                    </div>
                    <div className='action-selector'>
                        <input type='radio' name='adminAction' value='createAssetType' onChange={handleAdminAction} />
                        <label htmlFor='adminAction'>Create Asset Type</label>
                    </div>
                    <div className='action-selector'>
                        <input type='radio' name='adminAction' value='addAsset' onChange={handleAdminAction} />
                        <label htmlFor='adminAction'>Add Asset</label>
                    </div>
                    <div className='action-selector'>
                        <input type='radio' name='adminAction' value='viewAsset' onChange={handleAdminAction} />
                        <label htmlFor='adminAction'>View Existing Assets</label>
                    </div>
                    <div className='action-selector'>
                        <input type='radio' name='adminAction' value='createUser' onChange={handleAdminAction} />
                        <label htmlFor='adminAction'>Create User</label>
                    </div>
                </div>
            </div>
            {adminAction === 'invoice' &&
                <div>
                    <Purchase/>
                </div>
            }
            {adminAction === 'createAssetType' &&
                <div>
                    <CreateAsset />
                </div>
            }
            {adminAction === 'addAsset' &&
                <div>
                    <AddAsset />
                </div>
            }
            {adminAction === 'viewAsset' &&
                <div>
                    <div className='admin-header'>
                        <h2>Select the department to view the assets</h2>
                    </div>

                    <div className='admin-cards-main-container'>
                        <Cards deptlist= {departmentList}/>
                    </div>
                </div>
            }

            {adminAction === 'createUser' &&
                <div className='admin-form-main'>
                    <form className='admin-form-sub' onSubmit={handleUserCreationForm} encType="multipart/form-data">
                        <div className='admin-dept-selector'>
                            <label htmlFor='user-creation'>Department:</label>
                            <select id='dept-dropdown' name='dept' value={dept} onChange={handleDeptSelection} >
                                <option value="">--Select Department--</option>
                                <option value="cse">CSE</option>
                                <option value="ece">ECE</option>
                                <option value="eee">EEE</option>
                                <option value="ise">ISE</option>
                            </select>
                        </div>

                        <div className='admin-user-type-selector'>
                            <label htmlFor='user-creation'>User Type:</label>
                            <select id='userType-dropdown' name='userType' value={userType} onChange={handleUserTypeSelection}>
                                <option value="">--Select User Type--</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <div className='admin-username-selector'>
                            <label htmlFor='userName'>User name:</label>
                            <input type='text' name='userName' value={userName} onChange={handleUserNameChange}></input>
                        </div>

                        <div className='admin-password-selector'>
                            <label htmlFor='password'>Password:</label>
                            <input type='password' name='password' value={password} onChange={handlePasswordChange}></input>
                        </div>

                        <div className='admin-create-button'>
                            <button type="submit">Create User</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default AdminHomePage