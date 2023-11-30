import React from 'react'
import { useNavigate } from 'react-router-dom'
import departmentList from '../../pages/api/departmentList'
import axios from '../../axios/axios'
import './cards.css'
function Cards() {
    const navigate = useNavigate();
    const handleClickDept = async (index) => {
        const deptName = index.deptName;
        const id = index.id;
        navigate(`/${deptName}`)

        try{
            const depList = axios.get('/get-departments')
            console.log(depList)
        }catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className='cards-main-container'>
                {
                    departmentList.map((index, key) => {
                        {console.log(index.name)}
                        return (
                            <div className='cards-sub-container' onClick={() => handleClickDept(index)}>
                                <div className='cards-title'>{index.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cards