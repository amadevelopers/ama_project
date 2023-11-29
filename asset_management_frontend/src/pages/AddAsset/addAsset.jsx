import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

import '../../css/addAsset.css'
import details from './tagAssetDetails.json'
import noTagDetails from './noTagAssetDetails.json'
import assetTypeNew from './assetType'
import noTagAssetDetails from './noTagAssetDetails'
function AddAsset() {
    const [assetSubType, setassetSubType] = useState('')
    const [tagSerialNo, settagSerialNo] = useState('')
    const [tagAssetSpecsDisplay, settagAssetSpecsDisplay] = useState(false)
    const [specsToBeEdited, setspecsToBeEdited] = useState('')
    const [newSpecsValue, setnewSpecsValue] = useState('')
    const [specsObj, setSpecsObj] = useState({ '': '' });
    const [qtyOfAsset, setqtyOfAsset] = useState('')
    const [assetType, setassetType] = useState('')
    const [currentFormIndex, setCurrentFormIndex] = useState(0);

    const handleAssetSubType = async (e) => {
        await setassetSubType(e.target.value)
    }

    const handleTagAssetSerialNo = async (e) => {
        settagSerialNo(e.target.value)
        await console.log(e.target.value)
    }
    const handleSubmitAssetTye = (e) => {
        //call the api to get the specs of the asset
        e.preventDefault()
        settagAssetSpecsDisplay(true);
    }

    const handleSubmitSpecs = async (e) => {
        //call api for sending the new specs
        e.preventDefault();
        await setSpecsObj({ [specsToBeEdited]: newSpecsValue });

        console.log("specs", specsObj)
        //added newly
        setspecsToBeEdited('');
        setnewSpecsValue('');
    }

    const handleAssetTypeSelection = (e) => {
        setassetType(e.target.value)
    }
    const handleformSubmitted = (formdata) => {
        console.log(formdata)
    }
    const handleFormSubmit = () => {
        // Handle form submission logic here
        setCurrentFormIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            console.log(newIndex, qtyOfAsset)
            // Check if it's the last form
            if (newIndex == qtyOfAsset) {
                // Reload the page
                window.location.reload();
            }

            return newIndex;
        });
    };

    return (
        <div className='add-asset-main-container'>
            <div className='add-asset-radio-selector'>
                <h3>Enter the type of Asset</h3>
                <div className='asset-radio-main-container'>
                    <div className='asset-type-selector'>
                        <input type='radio' name='tag' value='tag' onChange={handleAssetSubType}></input>
                        <label htmlFor='typeOfAsset'>Tag</label>
                    </div>
                    <div className='asset-type-selector'>
                        <input type='radio' name='tag' value='notag' onChange={handleAssetSubType}></input>
                        <label htmlFor='typeOfAsset'>No Tag</label>
                    </div>
                </div>
            </div>

            {
                assetSubType === 'tag' &&
                <div className='add-asset-tag-main'>
                    <form className='add-asset-tag-sub' onSubmit={handleSubmitAssetTye}>
                        <label htmlFor=''>Enter the serial No of the asset</label>
                        <input type='text' name='serialNo' value={tagSerialNo} onChange={handleTagAssetSerialNo}></input>
                        <button type='submit'>Submit</button>
                    </form>
                    {
                        tagAssetSpecsDisplay &&
                        <div className='tag-assets-specs-main'>
                            <p>{details[1].assetType}</p>
                            <div className='tag-assets-container'>
                                {Object.keys(details[1].specifications).map((key, value) => {
                                    return (
                                        <div className='tag-assets-specs-sub'>
                                            <p>{key}</p>
                                            <p>{details[1].specifications[key]}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <form className='tag-form' onSubmit={handleSubmitSpecs}>
                                <div className='tag-edit-specs'>
                                    <label htmlFor='editSpecs'>Enter the specification which you would like to change</label>
                                    <input type='text' name='editSpecs' value={specsToBeEdited} onChange={(e) => setspecsToBeEdited(e.target.value)}></input>
                                </div>
                                <div className='tag-new-specs'>
                                    <label htmlFor='editSpecs'>Enter the new value </label>
                                    <input type='text' name='newSpecs' value={newSpecsValue} onChange={(e) => setnewSpecsValue(e.target.value)}></input>
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    }
                </div>
            }

            {
                assetSubType === 'notag' &&
                <div className='notag-main-container'>
                    <div className='notag-sub-container'>
                        <label htmlFor='qtyOfAsset'>Enter the quantity of assets to be added</label>
                        <input type='number' name='qtyOfAsset' value={qtyOfAsset} onChange={(e) => setqtyOfAsset(e.target.value)}></input>
                    </div>
                    <div className='notag-asset-type-dropdown'>
                        <label htmlFor='assetType'>Asset Type: </label>
                        <select id='assetTypeDropdown' name='assetTpe' value={assetType} onChange={handleAssetTypeSelection} >
                            <option value="">--Select Asset Type--</option>
                            {/* {assetTypeList.assetTypes.map((key, value) => {
                                return (
                                    <option value={key}>{key}</option>
                                )
                            })} */}
                            {
                                Object.keys(assetTypeNew).map((key, ind) => {
                                        return (
                                            <>
                                                <option key={ind}>{assetTypeNew[key].name}</option>
                                            </>
                                        )
                                })}
                        </select>
                    </div>
                    {currentFormIndex < Number(qtyOfAsset) && (
                        <div className='notag-forms' key={currentFormIndex}>
                            <AssetDetails assetType={assetType} onDataUpdate={handleformSubmitted} onFormAction={handleFormSubmit} />
                        </div>
                    )}

                </div>
            }
        </div>
    )
}



function AssetDetails(props) {
    const { assetType } = props
    const [specs, setspecs] = useState([])
    // const [formSubmitted, setFormSubmitted] = useState(true);
    const [specsValues, setspecsValues] = useState({})

    const handleSpecsSelection = (e, specName) => {
        const newSpecsValues = { ...specsValues };
        newSpecsValues[specName] = e.target.value;
        setspecsValues(newSpecsValues);
    }

    const handleSave = async (e) => {
        e.preventDefault()
        console.log(specsValues)
        props.onDataUpdate(specsValues);
        await setspecsValues({})
        props.onFormAction();
    };
    console.log(noTagAssetDetails)
    return (
        <div className='assetDetails-from-main'>
            {assetType &&
                // <form className='assetDetails-form' onSubmit={handleSave}>
                //     {Object.keys(noTagDetails[assetType]).map((value, index) => {
                //         return (
                //             <div className='assetDetails-input' key={index}>
                //                 <label htmlFor='specsInput'>{value}</label>
                //                 <input type='text' value={specs[value]} onChange={(e) => handleSpecsSelection(e, value)}></input>
                //             </div>
                //         )
                //     })}
                //     <button type='submit'>Save</button>
                // </form>
                <form className='assetDetails-form' onSubmit={handleSave}>
                    {Object.keys(noTagDetails[assetType]).map((value, index) => {
                        return (
                            <div className='assetDetails-input' key={index}>
                                <label htmlFor='specsInput'>{value}</label>
                                <input type='text' value={specs[value]} onChange={(e) => handleSpecsSelection(e, value)}></input>
                            </div>
                        )
                    })}
                    <button type='submit'>Save</button>
                </form>
            }
        </div>
    );
}

export { AddAsset, AssetDetails }