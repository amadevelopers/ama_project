import React, { useEffect, useState } from 'react';
import '../css/purchase.css';
import axios from '../axios/axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

function Purchase() {
  const [vendorNames, setVendorNames] = useState([]);
  const [formData, setFormData] = useState({ invoice: "", date: "", vendor: "", quantity: "", amount: "", dept: "" });
  const [showCards, setShowCards] = useState(false); // State to manage showing/hiding cards
  const [showModal, setShowModal] = useState(false); // State to manage showing/hiding modal
  const [modalFormData, setModalFormData] = useState({ name:"", serial_no : "", asset_type:"" ,room:"", department:"",purchase:"", target_department: "", specs:[],price:""}); // State to store modal form data
  const [departmentList, setDepartmentList] = useState([]);
  const [cardCount, setCardCount] = useState(0);// to keep track of the no of cards generated 
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [assetTypeNew, setAssetTypeNew] = useState([]);
  const [specs, setspecs] = useState([]);
  const [specsArray, setSpecsArray] = useState([]);
  const [roomList,setroomList] = useState([]);
  const [cardsKey, setCardsKey] = useState(0);
   // Use a key to force a re-render of the cards component when modalFormData changes
  const navigate = useNavigate()
  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCreateCards = async () => {
    if (formData.quantity === "") {
      alert("Please enter a quantity before generating cards.");
    } else {
      
      try {
        const response = await axios.get("/GetAssetTypes")
        setAssetTypeNew(response.data)
      } catch (err) {
        console.log(err.message)
      }
      setShowCards(true);
      setShowModal(true);
      if(modalFormData.department != ""){
        try {
          const response = await axios.post("/GetAssetsByRoom", modalFormData.department, { headers: { 'Content-Type': 'application/json' } })
          setroomList(response.data)
        } catch (err) {
          console.log(err.message)
        }
      }

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

  const handleSaveModalData = async () => {
    try {
      console.log(modalFormData)
      // const response = await axios.post("/AddAssets", modalFormData, { headers: { "Content-Type": "application/json" } });
      // console.log(response.data)
      setCardCount(cardCount + 1);
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setModalFormData((prevdata) => ({ ...prevdata,name:"", serial_no : "", asset_type:"" ,room:"", department:"",purchase:"", target_department: "", specs:[],price:""}));
      // setModalFormData({});
      console.log(`card ${cardCount}`, modalFormData)
      // Increment the key to force a re-render of the cards component
      setCardsKey((prevKey) => prevKey + 1);
      alert(`details of card ${parseInt(cardCount) + 1} saved`)
    } catch (error) {
      console.error("API call failed:", error.message);
      console.log("Error response:", error.response.data);

    }
  };


  const handleModalInputChange = async (event, cardIndex) => {
    const { name, value } = event.target;
    setModalFormData((prevModalFormData) => ({
      ...prevModalFormData,
      [name]: value
    }));

    if (name === "tag" && value === "Tag") {
      try {
        const assetName = {
          asset_name: modalFormData.asset_type
        }
        const response = await axios.post("/GetAssetSpecs", assetName, { headers: { "Content-Type": "application/json" } })
        await setSpecsArray(response.data)
      } catch (err) {
        console.log(err.message)
      }
    }

    if (name === "specs") {
      console.log(name)
      setspecs((prevEle) => [...prevEle, value])
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const purchaseObj = {
        "invoice_no": formData.invoice,
        "department": formData.dept,
        "date": formData.date,
        "seller": formData.vendor
      }
      // alert(`invoice: ${formData.invoice}, date: ${formData.date}, vendor: ${formData.vendor}, quantity: ${formData.quantity}, amount: ${formData.amount}`);
      const response = await axios.post("/Purchases", purchaseObj, { headers: { "Content-Type": "application/json" } })

      setFormData({})
    }
    catch (err) {
      console.log(err.message)
    }
  };

  useEffect(() => {

    return () => {
      const fetchVendors = async () => {
        try {
          const response = await axios.get("/GetVendors")
          setVendorNames(response.data)
        } catch (err) {
          console.log(err.message)
        }
      }

      const getDepts = async () => {
        try {
          const response = await axios.get("/GetDepartment")
          setDepartmentList(response.data)
        } catch (err) {
          console.log(err.message)
        }
      }
      fetchVendors()
      getDepts()
    }
  }, [])

  useEffect(() => {
    if (cardCount === parseInt(formData.quantity)) {
      // All cards have been generated, navigate to the next page or perform any other action
      setShowModal(false);
      setShowCards(false);
      setModalFormData({});
      setFormData({})
    }
  }, [cardCount, formData.quantity, navigate]);


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
              <option>---select---</option>
              {Object.keys(vendorNames).map((index, key) => (
                <option key={key} value={vendorNames[index].name}>{vendorNames[index].name}</option>
              ))}
            </select>
          </div>
          <div className='purchase-sub'>
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
          </div>
          <div className='purchase-sub'>
            <label>Target Department:</label>
            <select name="dept" value={formData.dept} onChange={handleChange}>
              <option>---Select---</option>
              {departmentList.map((department, deptIndex) => (
                <>
                  <option key={deptIndex} value={departmentList[deptIndex].name}>{department.name}</option>
                </>
              ))}
            </select>
          </div>
          <div className='purchase-sub'>
            <label htmlFor="amount">Total Amount:</label>
            <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} />
          </div>

          <button type="submit" >Submit</button>
          <button type="button" onClick={handleCreateCards}>Create Card</button>
        </form>
      </div>

      {/* Modal for cards */}
      {showModal && cardCount < parseInt(formData.quantity) && (
        <div key={cardsKey} className="modal">
        <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>Close</button>
            {/* Render cards based on quantity */}
            {/* {showCards && Array.from({ length: parseInt(formData.quantity) }, (_, index) => ( */}
            {showCards && Array.from({ length: 1 }, (_, index) => (
              <div key={index} className="card">
                <label>Serial Number:</label>
                <input type="text" name="serial_no" onChange={(e) => handleModalInputChange(e, index)} />

                <label>Name</label>
                <input type="text" name="name" onChange={(e) => handleModalInputChange(e, index)} />

                <label>Price</label>
                <input type="text" name="price" onChange={(e) => handleModalInputChange(e, index)} />

                <label>Asset Type:</label>
                <select name="asset_type" onChange={(e) => handleModalInputChange(e, index)}>
                  {/* Dynamically render asset type options from assetTypeNew */}
                  <option>---Select---</option>
                  {assetTypeNew.map((asset, assetIndex) => (
                    <option key={assetIndex} value={asset.name}>{asset.name}</option>
                  ))}
                </select>

                <label>Tag or No Tag:</label>
                <div>
                  <div className='tag-radio-button'>
                    <input type="radio" id={`tag`} name={`tag`} value="Tag" onChange={(e) => handleModalInputChange(e, index)} />
                    <label htmlFor={`tag`}>Tag</label>
                  </div>
                  <div className='tag-radio-button'>
                    <input type="radio" id={`noTag`} name={`tag`} value="NoTag" onChange={(e) => handleModalInputChange(e, index)} />
                    <label htmlFor={`noTag`}>No Tag</label>
                  </div>
                </div>
                {
                  modalFormData.tag === "NoTag" &&
                  <div>

                  </div>
                }

                {
                  modalFormData.tag === "Tag" &&
                  <div>
                    {specsArray[0] && specsArray[0].specs && Array.isArray(specsArray[0].specs) && specsArray[0].specs.length > 0 && (
                      (specsArray[0].specs).map((spec, index) => (
                        <div key={index}>
                          <label htmlFor={`specs_${index}`}>{spec}</label>
                          <input
                            type='text'
                            id={`specs_${index}`}
                            name={`specs_${index}`}
                            // name="specs"
                            // value={spec}
                            onChange={(e) => handleModalInputChange(e, index)}
                          />
                        </div>
                      ))
                    )}
                  </div>
                }
                <label>Target Department:</label>
                <select name="department" onChange={(e) => handleModalInputChange(e, index)}>
                  {/* Dynamically render department options from departmentList */}
                  <option>---Select---</option>
                  {departmentList.map((department, deptIndex) => (
                    <option key={deptIndex} value={department.name}>{department.name}</option>
                  ))}
                </select>
                <label>Target Room:</label>
                <select name="room" onChange={(e) => handleModalInputChange(e, index)}>
                  {/* Dynamically render department options from departmentList */}
                  <option>---Select---</option>
                  {roomList.map((room, roomIndex) => (
                    <option key={roomIndex} value={room.name}>{room.name}</option>
                  ))}
                </select>
                {cardCount <= parseInt(formData.quantity) && (
                  <button onClick={handleSaveModalData}>Save</button>
                )}
              </div>
            ))}
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
    navigate("/viewAsset", { state: { data: response.data } })

  }
  return (

    <div className='purchase-main'>
      <Header />
      <div className='wrapper'>
        <Sidebar />
        <div className='purchase-form'>
          <button onClick={getPurchase}>Click to view purchases</button>
        </div>

      </div>
    </div>
  )
}

export { Purchase, ViewPurchases };
