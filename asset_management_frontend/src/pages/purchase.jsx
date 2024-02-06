import React, { useState } from 'react';
import '../css/purchase.css';
import axios from '../axios/axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { ViewAssetsTable } from './viewAssets';
import departmentList from './api/departmentList';
import assetTypeNew from './AddAsset/assetType';

function Purchase(props) {
  const vendorNamesdropdown = props.vendors;
  const [vendorNames, setVendorNames] = useState({});
  const [formData, setFormData] = useState({ invoice: "", date: "", vendor: "", quantity: "", amount: "" });
  const [showCards, setShowCards] = useState(false); // State to manage showing/hiding cards
  const [showModal, setShowModal] = useState(false); // State to manage showing/hiding modal
  const [modalFormData, setModalFormData] = useState({}); // State to store modal form data

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    try {
      const response = await axios.get('/GetVendors');
      setVendorNames(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateCards = () => {
    if (formData.quantity === "") {
      alert("Please enter a quantity before generating cards.");
    } else {
      setShowCards(true);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    if (Object.keys(modalFormData).length > 0) {
      const confirmClose = window.confirm("Your changes won't be saved. Are you sure you want to close?");
      if (confirmClose) {
        setShowModal(false);
        setShowCards(false);
        setModalFormData({});
      }
    } else {
      setShowModal(false);
      setShowCards(false);
      setModalFormData({});
    }
  };

  const handleSaveModalData = () => {
    console.log("Saving modal data:", modalFormData);
    setShowModal(false);
    setShowCards(false);
    setModalFormData({});
  };
  

  const handleModalInputChange = (event, cardIndex) => {
    const { name, value } = event.target;
    setModalFormData((prevModalFormData) => ({
      ...prevModalFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    alert(`invoice: ${formData.invoice}, date: ${formData.date}, vendor: ${formData.vendor}, quantity: ${formData.quantity}, amount: ${formData.amount}`);
  };

  return (
    <div className='purchase-main'>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <h1>Purchase</h1>
        <form onSubmit={handleSubmit} className='purchase-form'>
          <div className='purchase-sub'>
            <label htmlFor="invoice">Invoice Number:</label>
            <input type="text" id="invoice" name="invoice" value={formData.invoice} onChange={handleChange} />
          </div>
          <div className='purchase-sub'>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
          <div className='purchase-sub'>
            <label htmlFor="vendor">Vendor Name:</label>
            <select name="vendor" value={formData.vendor} onChange={handleChange}>
              {Object.keys(vendorNames).map((index, key) => (
                <option key={key} value={index}>{vendorNames[index].name}</option>
              ))}
            </select>
          </div>
          <div className='purchase-sub'>
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
            <button type="button" onClick={handleCreateCards}>Create Card</button>
          </div>
          <div className='purchase-sub'>
            <label htmlFor="amount">Total Amount:</label>
            <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Modal for cards */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>Close</button>
            {/* Render cards based on quantity */}
            {showCards && Array.from({ length: parseInt(formData.quantity) }, (_, index) => (
              <div key={index} className="card">
                <label>Serial Number:</label>
                <input type="text" name={`serialNumber_${index}`} onChange={(e) => handleModalInputChange(e, index)} />

                <label>Asset Type:</label>
                <select name={`assetType_${index}`} onChange={(e) => handleModalInputChange(e, index)}>
                  {/* Dynamically render asset type options from assetTypeNew */}
                  {assetTypeNew.map((asset, assetIndex) => (
                    <option key={assetIndex} value={asset.name}>{asset.name}</option>
                  ))}
                </select>

                <label>Tag or No Tag:</label>
                <div>
                  <input type="radio" id={`tag_${index}`} name={`tag_${index}`} value="Tag" onChange={(e) => handleModalInputChange(e, index)} />
                  <label htmlFor={`tag_${index}`}>Tag</label>
                  <input type="radio" id={`noTag_${index}`} name={`tag_${index}`} value="No Tag" onChange={(e) => handleModalInputChange(e, index)} />
                  <label htmlFor={`noTag_${index}`}>No Tag</label>
                </div>

                <label>Target Department:</label>
                <select name={`targetDepartment_${index}`} onChange={(e) => handleModalInputChange(e, index)}>
                  {/* Dynamically render department options from departmentList */}
                  {departmentList.map((department, deptIndex) => (
                    <option key={deptIndex} value={department.name}>{department.name}</option>
                  ))}
                </select>
              </div>
            ))}
            <button onClick={handleSaveModalData}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}



function ViewPurchases() {
  const navigate = useNavigate()
  const getPurchase = async () => {
    const response = await axios.get('/Purchases')
    navigate("/viewAsset", { state: { data : response.data}})

  }
  return (

    <div className='purchase-main'>
      <Header />
      <div className='wrapper'>
      <Sidebar />
      <div className='purchase-form'>
        <button onClick={getPurchase}>Click me</button>
      </div>

      </div>
    </div>
  )
}

export { Purchase, ViewPurchases };
