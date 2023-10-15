import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/cseDept.css';
import CardData from '../components/cards/cardData';
import assetData from './dummy.json';
const CseDept = (props) => {
    const { deptname,deptId } = useParams();
    console.log(deptname,deptId)
    const department = assetData[0];
    const deptNum = CardData[deptId].id;
    console.log(deptNum)

    // console.log("hey",deptname, "\n there",department)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        quantity: '',
        purchaseDate: '',
        price: '',
    });
    const [items, setItems] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = () => {
        //yup validation
        if (!formData.name || !formData.id || !formData.quantity || !formData.purchaseDate || !formData.price) {
            alert("Please fill out all required fields.");
            return;
        }
        const newItem = { ...formData };
        setItems([...items, newItem]);

        setFormData({
            name: '',
            id: '',
            quantity: '',
            purchaseDate: '',
            price: '',
        });

        closeModal();
    };

    const handleEdit = (index) => {
        const itemToEdit = items[index];
        setFormData({ ...itemToEdit });
        openModal();

        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const handleDelete = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    return (
        <div className="main-div">
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>ID</th>
                        <th>Quantity</th>
                        <th>Purchase Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {/* maps work only for array and not for objects */}
                    {Object.keys(department).map((key, index) => (
                        <>
                            {console.log(department)}
                            {console.log(department[key])}
                            {Object.keys(department[key]).map((rooms, index) => (
                                <>
                                {
                                    Object.keys(department[key][rooms]).map((item,index) => (
                                        <>
                                            {/* {console.log(department[key][rooms])} */}
                                            {console.log(department[key][rooms][item].name)}
                                            {console.log("hello",item)}
                                            {
                                                // Object.keys(department[key][rooms][assets].map((item,index) => {
                                                    <>
                                                    {/* {console.log(department[key][rooms][assets][item])} */}
                                                    <tr key={index}>
                                                        {console.log(index)}
                                                        <td>{department[key][rooms][item].name}</td>
                                                        <td>{department[key][rooms][item].id}</td>
                                                        <td>{department[key][rooms][item].quantity}</td>
                                                        <td>{department[key][rooms][item].purchaseDate}</td>
                                                        <td>{department[key][rooms][item].price}</td>
                                                        <td>
                                                            <button className='edit-btn' onClick={() => handleEdit(index)}>Edit</button>
                                                        </td>
                                                        <td>
                                                            <button className='delete-btn' onClick={() => handleDelete(index)}>Delete</button>
                                                        </td>
                                                    </tr>   
                                                    </>
                                                // }))
                                            }
                                        </>
                                    ))
                                }
                            </>
                            ))}
                        </>

                    ))}
                    <button className="add-btn" onClick={openModal}>
                        Add
                    </button>
                </tbody>
            </table>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            x
                        </span>
                        <h2>Add Item</h2>
                        <form>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                ID:
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Quantity:
                                <input
                                    type="text"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Purchase Date:
                                <input
                                    type="text"
                                    name="purchaseDate"
                                    value={formData.purchaseDate}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Price:
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button className='save-btn' onClick={handleSubmit}>Save</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CseDept;

