import React, { useState } from 'react';
import Header from '../components/header/header';
import '../css/createAsset.css';

function CreateAsset() {
  const [name, setName] = useState('');
  const [inputFields, setInputFields] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [assetObject, setAssetObject] = useState({});

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleToggleInput = () => {
    setInputFields([...inputFields, <input type="text" placeholder="Enter Spec" />]);
    setShowInput(true);
  };

  const handleSave = () => {
    if (name) {
      const specs = inputFields.map((field) => field.props.value);
      setAssetObject({
        ...assetObject,
        "name": [...specs]
      });
      setName(''); // Clear the name input field
      setInputFields([]); // Clear the spec input fields
      console.log(assetObject); // Log the object to the console
    }
  };

  return (
    <div>
      <Header />
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

      {showInput && inputFields.map((field, index) => (
        <div key={index}>{field}</div>
      ))}
      <button onClick={handleToggleInput}>ADD</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default CreateAsset;
