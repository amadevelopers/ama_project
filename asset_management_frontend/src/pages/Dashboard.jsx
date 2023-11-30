
import React from 'react';
import Header from '../components/header/header';
import Sidebar from './Dashboard Pages/Sidebar';
import Home from './Dashboard Pages/Home';
import '../css/Dashboard/dashboard.css';
import { useState } from 'react';

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Home />
    </div>
  );
}

export default Dashboard;
