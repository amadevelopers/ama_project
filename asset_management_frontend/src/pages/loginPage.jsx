import React, { useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import '../css/loginPage.css'
import axios from '../axios/axios';

function LoginPage() {

  const navigate = useNavigate();

  const handleClick = async() => {
    try{
      const response = await axios.get("/Dashboard")
      // console.log(response.data)
      const value = response.data
      
      // console.log(value)
      navigate(`/dashboard`, { state: { assets: value } });

    }catch(err){
      console.log(err.message)
    }
  }

  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);

  const handleUserTypeSelection = (e) => {
    const userType = e.target.value;
    if (userType === 'user') {
      setUser(true);
      setAdmin(false);
      setSuperAdmin(false);
    } else if (userType === 'admin') {
      setAdmin(true);
      setUser(false);
      setSuperAdmin(false);
    } else if (userType === 'superadmin') {
      setSuperAdmin(true);
      setUser(false);
      setAdmin(false);
    }
  };

  return (
    <div className='login-main'>
      <Header />
    <div className='login-sub'>
      <div className="login-form">
        <h2>Login</h2>
        <div>
          <label>Select User Type:</label>
          <select name="userType" value={user} onChange={handleUserTypeSelection}>
            <option value="">Select User Type</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>


        <div>
          {user && (
            <div>
              <label>Name:</label>
              <input type="text" placeholder="Name" />
              <label >Department:</label>
              <select>
                <option value="">Select Dept</option>
                <option value="cse">CSE</option>
                <option value="ise">ISE</option>
                <option value="ece">ECE</option>
              </select>
            </div>
          )}

          {admin && (
            <div>
              <label>Department:</label>
              <select>
                <option value="">Select Dept</option>
                <option value="cse">CSE</option>
                <option value="ise">ISE</option>
                <option value="ese">ECE</option>
              </select>
            </div>
          )}

          {superAdmin && (
            <div>
              <p className='sa'>Super Admin</p>
            </div>
          )}
        </div>


        <div>
          <label>Password:</label>
          <input type="password" placeholder="Password" />
        </div>

        <button className="home-button" onClick={handleClick}>Log In</button>
      </div>

    </div>
    </div>
  );
}

export default LoginPage;