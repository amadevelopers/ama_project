import React from 'react'
import '../css/cseDept.css'


const cseDept = () => {
  return (
    <div className='main-div'>


      <table>
        <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Quantity</th>
              <th>Purchase Date</th>
              <th>Price</th>
            </tr>
        </thead>
        <tbody>
              <tr>
                <td>Projector</td>
                <td>123456</td>
                <td>20</td>
                <td>10/10/23</td>
                <td>20000</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>

              <tr>
                <td>Projector</td>
                <td>123456</td>
                <td>20</td>
                <td>10/10/23</td>
                <td>20000</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>

             

             
        </tbody>
      </table>
        
      
    </div>
  )
}

export default cseDept
