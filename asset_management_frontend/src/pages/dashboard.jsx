import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../css/dashboard.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'
function Dashboard(props) {
  // const assets = props?.state?.assetss;
  const location = useLocation();
  const { assets } = location.state || {};
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const [searchResults, setSearchResults] = useState([]);

  const handleHeaderSearchResults = (data) => {
    setSearchResults(data);
  };
  return (
    <div className='grid-container'>
      <Header onHeaderSearchResults={handleHeaderSearchResults} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Home details={assets} />
    </div>
  )
}
export default Dashboard