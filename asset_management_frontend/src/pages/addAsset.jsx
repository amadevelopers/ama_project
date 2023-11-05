import React,{useState} from 'react'
import { useParams } from 'react-router-dom';

import '../css/addAsset.css'
import details from './tagAssetDetails.json' 
import assetTypeList from './assetType.json'
function AddAsset() {
    const [assetSubType, setassetSubType] = useState('')
    const [tagSerialNo, settagSerialNo] = useState('')
    const [tagAssetSpecsDisplay, settagAssetSpecsDisplay] = useState(false)
    const [specsToBeEdited, setspecsToBeEdited] = useState('')
    const [newSpecsValue, setnewSpecsValue] = useState('')
    const [specsObj, setSpecsObj] = useState({});
    const [qtyOfAsset, setqtyOfAsset] = useState('')


    const [assetType, setassetType] = useState('')

    const handleAssetSubType = async(e) => {
        await setassetSubType(e.target.value)
    }
    // console.log(details[1])
    console.log(assetTypeList.assetTypes)
    const handleTagAssetSerialNo = async(e) => {
        settagSerialNo(e.target.value)
        await console.log(e.target.value)
        console.log(tagSerialNo)
    }
    const handleSubmitAssetTye = (e) => {
        //call the api to get the specs of the asset
        e.preventDefault()
        settagAssetSpecsDisplay(true);
    }
    
    const handleSubmitSpecs = async(e) => {
        //call api for sending the new specs
        e.preventDefault();
        await setSpecsObj({ [specsToBeEdited]: newSpecsValue });
        
        console.log("specs", specsObj)
    }

    const handleAssetTypeSelection = (e) => {
        setassetType(e.target.value)
    }
    return (
        <div>
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
                            {/* <p>Asset type</p> */}
                            <p>{details[1].assetType}</p>
                            <div className='tag-assets-container'>
                                {Object.keys(details[1].specifications).map((key,value) => {
                                    return(
                                        <div className='tag-assets-specs-sub'>
                                            <p>{key}</p>
                                            <p>{details[1].specifications[key]}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <form onSubmit={handleSubmitSpecs}>
                                <div>
                                    <label htmlFor='editSpecs'>Enter the specification which you would like to change</label>
                                    <input type='text' name='editSpecs' value={specsToBeEdited} onChange={(e) => setspecsToBeEdited(e.target.value)}></input>
                                </div>
                                <div>
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
                <div>
                    <div>
                        <label htmlFor='qtyOfAsset'>Enter the quantity of assets to be added</label>
                        <input type='number' name='qtyOfAsset' value={qtyOfAsset} onChange={(e) => setqtyOfAsset(e.target.value)}></input>
                    </div>
                    <div className=''>
                            <label htmlFor='aeetType'>Asset Type: </label>
                            <select id='assetTypeDropdown' name='assetTpe' value={assetType} onChange={handleAssetTypeSelection} >
                                <option value="">--Select Asset Type--</option>
                                {assetTypeList.assetTypes.map((key,value) => {
                                    return (
                                        <option value={key}>{key}</option>
                                    )
                                })}
                            </select>
                        </div>
                </div>
            }
        </div>
    )
}

export default AddAsset