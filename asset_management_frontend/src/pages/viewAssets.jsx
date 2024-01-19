import React, { useState } from 'react';
import '../css/viewAsset.css';
import Header from '../components/header/header';
import Sidebar from '../components/Sidebar';
import buildingData from './buildingData';
import roomData from './roomData';
import roomsData from './roomsData';

function ViewAssets() {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);

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

  return (
    <div className='view-main'>
      <div className='header-div'>
        <Header />
      </div>
      <div className="view-wrapper">
        <div className='sidebar-container'>
          <Sidebar />
        </div>
        <div className='contents'>
          <div className='contents-sub'>
            <select
              className='building'
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
        </div>
      </div>
    </div>
  );
}

export default ViewAssets;
