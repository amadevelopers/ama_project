import Header from '../components/header/header';
import React from 'react';
import '../css/purchase.css';
import { useState } from "react";
// import vendorNames from './api/vendorNames';
import axios from '../axios/axios';
function Purchase(props) {  
  const vendorNamesdropdown = props.vendors
  //   const handleSubmit = event => {
  //  event.preventDefault();
  //  alert('You have submitted the form.')
  //    }
  const [vendorNames,setVendorNames] = useState([{}]); 
  const [formData, setFormData] = useState({invoice: "",date:"",vendor: "",quantity:"",amount:""});
  // console.log(vendorNames)
  const handleChange = async(event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    try{
      const response = await axios.get('/GetVendors')
      console.log(response.data)
      setVendorNames(response.data)
  }catch(error){
      console.log(error.message)
  }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
    alert(`invoice: ${formData.invoice}, date: ${formData.date}, vendor: ${formData.vendor}, quantity: ${formData.quantity}, amount: ${formData.amount}`
    );
  };
  return ( 
    <div className="wrapper">
      <h1>Purchase</h1>
      <form onSubmit={handleSubmit}> 
        <label htmlFor="invoice">Invoice Number:</label>
        <input type="text" id="invoice" name="invoice" value={formData.invoice} onChange={handleChange}/>

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange}/>

        <label htmlFor="vendor">Vendor Name:</label>
        {/* <input type="text" id="vendor" name="vendor" value={formData.vendor} onChange={handleChange}/> */}
        <select>
          {Object.keys(vendorNames).map((index,key) => {
            return <option key={key} value={index}>{vendorNames[index].name}</option>;
          })}
        </select>

        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange}/>
        <label htmlFor="amount">Total Amount:</label>
        <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange}/>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Purchase;
