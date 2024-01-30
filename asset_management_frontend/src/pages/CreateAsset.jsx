import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../css/createAsset.css';
import axios from '../axios/axios';
import Sidebar from '../components/Sidebar';

function CreateAsset() {
  const [name, setName] = useState('');
  const [assetObject, setAssetObject] = useState({});
  const [inputValues, setInputValues] = useState([]);
  const [showInputField, setshowInputField] = useState(false);
  const [isAddButtonDisabled, setAddButtonDisabled] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setAddButtonDisabled(!e.target.value); // Enable "Add" button when there is an asset name
  };

  const handleCreateAsset = () => {
    setshowInputField(true);
  };

  const handleAddInputField = () => {
    if (inputValues.every(value => value.trim() !== '')) {
      setInputValues([...inputValues, '']);
    }
  };

  const handleInputChange = (index, value) => {
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = value;
    setInputValues(updatedInputValues);
  };

  useEffect(() => {
    // console.log(assetObject);
  }, [assetObject]);

  const handleSave = async () => {
    try {
      if (name) {
        const specs = inputValues.filter(value => value.trim() !== ''); // Filter out empty values
        setAssetObject({ name, specs });
        setName('');
        setInputValues(['']);
        setshowInputField(false);
      }

      const formData = new FormData();
      formData.append('name', assetObject.name);
      assetObject.specs.forEach((spec, index) => {
        formData.append(`specs[${index}]`, spec);
      });

      console.log(formData);
      const assetType = await axios.post('/AddAssetType', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      console.log(assetType.status);
      alert('Details uploaded successfully');
    } catch (error) {
      // ... (existing error handling code)
    }
  };

  return (
    <div className='create-asset-type-main'>
      <Header />
      <div className='create-sub'>
        <Sidebar />
        <div className='create-sub-main-container'>
          <div className='ceate-sub-container'>
            <div className="heading">
              <h1>Create Asset Type</h1>
            </div>
            <div className='asset-type'>
              <input type="text" placeholder="Enter Asset" value={name} onChange={handleNameChange} />
              <button onClick={handleCreateAsset}>Create Asset</button>
            </div>
            {showInputField && (
              <div className='asset-specs-main'>
                <h3>Enter Specs</h3>
                <div className='specs-input'>
                  {inputValues.map((value, index) => (
                    <div className='specs-input-sub' key={index}>
                      <input type="text" value={value} onChange={(e) => handleInputChange(index, e.target.value)} />
                    </div>
                  ))}
                  <button onClick={handleAddInputField} disabled={isAddButtonDisabled}>Add</button>
                  <button onClick={handleSave}>Save</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAsset;
