import React, { useEffect, useState } from 'react';
import '../css/viewAsset.css';
import Header from '../components/header/header';
import Sidebar from '../components/Sidebar';
import buildingData from './buildingData';
import roomData from './roomData';
import roomsData from './roomsData';
import { TableBody, TableHead } from '../components/table/table';
import axios from '../axios/axios'
function ViewAssets() {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [searchObject, setSearchObject] = useState({})
  const[tableView,setTableView] = useState(false)
  const handleBuildingChange = (event) => {
    const selectedBuilding = event.target.value;
    setSelectedBuilding(selectedBuilding);

    // Filter the department data based on the selected building
    const departmentsForBuilding = roomData
      .filter(room => room.building.name === selectedBuilding)
      .map(room => room.name);

    setFilteredDepartments(departmentsForBuilding);

    // Reset the selected department and classroom when the building changes
    setSelectedDepartment('');
    setSelectedClassroom('');
  };

  const handleDepartmentChange = (event) => {
    const selectedDepartment = event.target.value;
    setSelectedDepartment(selectedDepartment);

    // Filter the classroom data based on the selected building and department
    const classroomsForDepartment = roomsData
      .filter(room => room.building === selectedBuilding && room.department === selectedDepartment)
      .map(room => room.name);

    // Use Set to get unique classroom values
    const uniqueClassrooms = [...new Set(classroomsForDepartment)];

    setFilteredClassrooms(uniqueClassrooms);

    // Reset the selected classroom when the department changes
    setSelectedClassroom('');
  };

  const handleClassroomChange = (event) => {
    setSelectedClassroom(event.target.value);
  };

  const [tableHead,setTableHead] = useState([])
  const [tableBody,setTableBody] = useState([[]])

  const handleSearch = async(e) =>{
    e.preventDefault()
    try{
      const formData = new Object()
      formData.room = selectedClassroom
      const response = await axios.post("/GetAssetsByRoom",formData,{ headers: { 'Content-Type': 'application/json' }  })
      console.log(response.data)
      
      if (response.data.length > 0) {
        const tablehead = Object.keys(response.data[0])
        setTableHead(tablehead);
        const newTableBody = response.data.map(row => Object.values(row));
        console.log(newTableBody)
        await setTableBody(newTableBody);
        console.log(tableBody)
        setTableView(true);
      }
      else {
        console.error('Empty response array');
      }
    }catch (err) {
      console.error('Axios Error:', err.message);
      if (err.response) {
        console.error('Response Data:', err.response.data);
        console.error('Status Code:', err.response.status);
      }
    }
  }

  useEffect(() => {
    // This will log the updated state when it changes
    console.log(tableBody);
  }, [tableBody]);

  return (
    <div className='view-main'>
      <div className='header-div'>
        <Header />
      </div>
      <div className="view-wrapper">
        <div className='sidebar-container'>
          <Sidebar />
        </div>
        <div className='view-asset-main-page'>
          <form className='contents' onSubmit={handleSearch}>
            <div className='contents-sub'>
              <select className='building'
                id="building"
                name="building"
                value={selectedBuilding}
                onChange={handleBuildingChange}
              >
                <option value="">Select a location</option>
                {buildingData.map((building, index) => (
                  <option key={index} value={building.name}>
                    {building.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='contents-sub'>
              <select
                className='department'
                id="department"
                name="department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
              >
                <option value="">Select a department</option>
                {filteredDepartments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div className='contents-sub'>
              <select
                className='classroom'
                id="classroom"
                name="classroom"
                value={selectedClassroom}
                onChange={handleClassroomChange}
              >
                <option value="">Select a classroom</option>
                {filteredClassrooms.map((classroom, index) => (
                  <option key={index} value={classroom}>
                    {classroom}
                  </option>
                ))}
              </select>
            </div>
            <div className='view-asset-button'>
              <button type='submit'>Search</button>
            </div>
          </form>
          {
            tableView && 
            <div className='view-table'>
              <ViewAssetsTable columnHead={tableHead} columnBody={tableBody}/>
              
            </div>
          }
        </div>
      </div>
    </div>
  );
}



function ViewAssetsTable({ columnHead, columnBody }) {
  return (
    <div className='view-table-main-div'>
      <TableHead tableHead={columnHead} />
      <TableBody rowData={columnBody} />
    </div>
  );
}
export { ViewAssets, ViewAssetsTable };