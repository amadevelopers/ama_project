import React from 'react'
import './sidebar.css'
import {Link} from 'react-router-dom'
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
           
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>

        <li className='sidebar-list-item'>
                <a href="">
                 <h1>Admin Actions</h1>
                </a>
            </li>


            <li className='sidebar-list-item'>
                <Link exact to="/purchases">
                    <BsGrid1X2Fill className='icon'/>  Purchases
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link exact to="/createAssetType">
                    <BsFillArchiveFill className='icon'/> Create Asset Type
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link exact to="/addAsset">
                    <BsFillGrid3X3GapFill className='icon'/> Add Asset
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link exact to="/viewAsset">
                <BsListCheck className='icon'/> View Existing Assets
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link exact to="/create-user">
                    
                    <BsPeopleFill className='icon'/> Create User
                </Link>
            </li>
            
        </ul>
    </aside>
  )
}

export default Sidebar