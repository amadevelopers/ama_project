import React from 'react'
import { useNavigate } from 'react-router-dom'
import departmentList from '../../pages/api/departmentList'
import axios from '../../axios/axios'
// import axios from 'axios'
import './cards.css'
function Cards(props) {
    // const departmentList = props.deptlist
    console.log(departmentList)
    const navigate = useNavigate();
    const handleClickDept = async (index) => {
        const deptName = index.name;
        const id = index.id;
        navigate(`/${deptName}`)

        try{
            console.log(index.deptName)
            console.log("inside try")
            const depList = await axios.get('/GetBuildings')
            console.log(depList.data)
        }catch(error) {
            // console.log("error is",e)
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Error data:', error.response.data);
                console.error('Status code:', error.response.status);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
              }
              console.error('AxiosError:', error.config);
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