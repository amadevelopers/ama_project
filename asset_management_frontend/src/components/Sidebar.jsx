import React from 'react'
// import './sidebar.css'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
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
                <a href="">
                    <BsGrid1X2Fill className='icon'/>  Purchases
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='icon'/> Create Asset Type
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Add Asset
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                <BsListCheck className='icon'/> View Existing Assets
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    
                    <BsPeopleFill className='icon'/> Create User
                </a>
            </li>
            
        </ul>
    </aside>
  )
}

export default Sidebar