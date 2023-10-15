import React from 'react'
import { useNavigate } from 'react-router-dom'
import CardData from './cardData'
import './cards.css'
function Cards() {
    const navigate = useNavigate();

    const handleClickDept = async(index) => {
        const deptName = index.deptName;
        const id = index.id;
        navigate(`/${deptName}/${id}`)
    }

    return (
        <div>
            <div className='cards-main-container'>
                {CardData.map((index,key) => {
                    return( 
                    <div className='cards-sub-container' onClick={() => handleClickDept(index)}>
                        <div className='cards-title'>{index.title}</div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default Cards