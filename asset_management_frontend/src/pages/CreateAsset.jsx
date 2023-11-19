import React, { useState,useEffect } from 'react';
import Header from '../components/header/header';
import '../css/createAsset.css';

function CreateAsset() {
  const [name, setName] = useState();
  const [inputFields, setInputFields] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [assetObject, setAssetObject] = useState({});
  
  const handleNameChange = async(e) => {
    await setName(e.target.value);
  };

  const handleToggleInput = () => {
    setInputFields([...inputFields, <input type="text"  placeholder="Enter Spec" />]);
    setShowInput(true);
  };

  // const handleSave = () => {
  //   if (name) {
  //     const specs = inputFields.map((field) => field.props.value);
  //     // console.log(inputFields)
  //     // setAssetObject({
  //     //   ...assetObject,
  //     //   "name":name,
  //     //   "specs": [...specs]
  //     // });
  //     console.log(inputValues)
  //     setAssetObject({"name":name,"specs":specs})
  //     console.log(assetObject); // Log the object to the console
  //     setName(''); // Clear the name input field
  //     setInputFields([]); // Clear the spec input fields
  //   }
  // };



//added by anagha
  const [inputCount, setInputCount] = useState(0);
  const [inputValues, setInputValues] = useState([]);

  const handleAddInputField = async() => {
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


  const handleSave = () => {
      if (name) {
      const specs = inputValues;
      setAssetObject({ name, specs });
      setName('');
      setInputValues([]);
    }
  };
  return (
    <div>
      {/* <Header /> */}
      <div className="heading">
        <h1>Create Asset Type</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Asset"
          value={name}
          onChange={handleNameChange}
        />
      </div>

      {/* {showInput && inputFields.map((field, index) => (
        <div key={index}>{field}</div>
      ))} */}
      {/* <button onClick={handleToggleInput}>ADD</button> */}


{/* added by anagha */}
      <div>
      <button onClick={handleAddInputField}>Add </button>
        {inputValues.map((value, index) => (
          <input className=''
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          />
          ))}
        <button onClick={handleSave}>Save</button>
    </div>
    </div>
  );
}

export default CreateAsset;
