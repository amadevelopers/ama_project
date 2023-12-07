import React, { useState, useEffect } from 'react';
import Header from '../components/header/header';
import '../css/createAsset.css';
import axios from '../axios/axios';
function CreateAsset() {
  const [name, setName] = useState();
  const [assetObject, setAssetObject] = useState({});

  const handleNameChange = async (e) => {
    await setName(e.target.value);
  };

  //added by anagha
  const [inputCount, setInputCount] = useState(0);
  const [inputValues, setInputValues] = useState([]);
  const [showInputField, setshowInputField] = useState(false);
  const handleAddInputField = async () => {
    setshowInputField(true)
    await setInputCount(inputCount + 1);
    await setInputValues([...inputValues, '']); // Add an empty value for the new input field
  };

  const handleInputChange = (index, value) => {
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = value;
    setInputValues(updatedInputValues);
    // console.log(inputValues)
  };
  useEffect(() => {
    console.log(assetObject);
  }, [assetObject]);


  const handleSave = async() => {
    try{
      if (name) {
        const specs = inputValues;
         setAssetObject({ name, specs });
         setName('');
         setInputValues(['']);
      }
      
      const formData = new FormData()
        formData.append("name",assetObject.name)
        assetObject.specs.forEach((spec, index) => {
          formData.append(`specs[${index}]`, spec);
        });

      
      await console.log(formData)        
      const assetType = await axios.post('/AddAssetType',formData,{headers:{'Content-Type':'multipart/form-data'}})
      console.log(assetType.status)
      alert('Details uploaded successfully')

    }catch(error){
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error data:', error.response.data);
        console.error('Status code:', error.response.status);
        alert('Something went wrong! Try again')

      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert('Something went wrong! Try again')

      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        alert('Something went wrong! Try again')

      }
      alert('Something went wrong! Try again')

      console.error('AxiosError:', error.config);
    }
  };
  return (
    <div>
      {/* <Header /> */}
      <div className="heading">
        <h1>Create Asset Type</h1>
      </div>
      <div className='asset-type-main'>
        <input
          type="text"
          placeholder="Enter Asset"
          value={name}
          onChange={handleNameChange}
        />
        <button onClick={handleAddInputField}>Add </button>
      </div>


      {/* added by anagha */}
      {
        showInputField && <div>
          <h3>Enter the Specifications</h3>
        <div className='specs-input'>
          {inputValues.map((value, index) => (
            <div className='specs-input-sub'>
            <input className=''
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <button onClick={handleAddInputField}>Add </button>
            </div>

          ))}
          <button onClick={handleSave}>Save</button>
        </div>

        </div>

      }
    </div>
  );
}

export default CreateAsset;
