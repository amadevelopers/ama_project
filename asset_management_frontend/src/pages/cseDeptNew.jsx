import React, { useState } from 'react';
import '../css/cseDept.css';

const CseDept = () => {
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
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.id}</td>
                            <td>{item.quantity}</td>
                            <td>{item.purchaseDate}</td>
                            <td>{item.price}</td>
                            <td>
                                <button className='edit-btn' onClick={() => handleEdit(index)}>Edit</button>
                            </td>
                            <td>
                                <button className='delete-btn' onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-btn" onClick={openModal}>
                Add
            </button>
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