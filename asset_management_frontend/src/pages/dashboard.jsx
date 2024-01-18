import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../css/dashboard.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'
function Dashboard(props) {
  // const assets = props?.state?.assets;
  const location = useLocation();
  const { assets } = location.state || {};
  console.log(assets);
      const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  
    return (
      <div className='grid-container'>
        <Header/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Home details={assets}/>
      </div>
    )
  }
export default Dashboard