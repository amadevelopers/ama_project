import { useState } from 'react'
import '../css/dashboard.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'
function Dashboard(props) {
  const assets = props?.state?.assets;
  console.log(assets);
  console.log(props)
      const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  
    return (
      <div className='grid-container'>
        <Header/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Home />
      </div>
    )
  }
export default Dashboard