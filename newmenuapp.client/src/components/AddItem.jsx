import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddItem.css';

const AddItem = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [itemType, setItemType] = useState(1); // Default item type
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItem = {
            title,
            description,
            image,
            price: parseInt(price),
            itemType
        };

        try {
            const response = await fetch('/api/item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Failed to add item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="addContainer">
            <h2>Yeni Bir Yemek Ekle</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>&#304;sim:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>A&#231;&#305;klama:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>G&#246;rsel Ba&#287;lant&#305;s&#305;:</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fiyat:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Kategori:</label>
                    <select
                        value={itemType}
                        onChange={(e) => setItemType(parseInt(e.target.value))}
                    >
                        <option value={1}>&#199;orba</option>
                        <option value={2}>Ara S&#305;cak</option>
                        <option value={3}>Ana Yemek</option>
                        <option value={4}>Tatl&#305;</option>
                        <option value={5}>&#304;&#231;ecek</option>
                    </select>
                </div>
                <button type="submit">Yeme&#287;i Ekle</button>
            </form>
        </div>
    );
};

export default AddItem;

