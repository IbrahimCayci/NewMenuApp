import React, { useState, useEffect } from 'react';
import { NavMenu } from './NavMenu';
import { useNavigate } from 'react-router-dom';
import './ShowItems.css'
import CategoryBar from './CategoryBar';

const ShowItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [dataType, setDataType] = useState(1);


    const navigate = useNavigate();

    // FETCH
    const fetchData = (retryCount = 0) => {
        fetch(`/api/item/type/${dataType}`)
            .then((response) => {
                console.log('Fetch response received:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); // Log the fetched data
                setItems(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                if (retryCount < 3) { // Retry up to 3 times
                    setTimeout(() => fetchData(retryCount + 1), 1000); // Retry after 1 second
                } else {
                    setError(error);
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        fetchData();
    }, [dataType]);

    const handleCategorySelect = (category) => {
        setDataType(category);
        setLoading(true);
        fetchData();
    };

    // EDIT
    const handleEdit = (id) => {
        navigate(`/edit-item/${id}`);
    };

    // DELETE
    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setShowPopup(true);
    };

    const confirmDelete = () => {
        fetch(`/api/item/${itemToDelete.id}`, {
            method: "DELETE",
        })
            .then(() => {
                setItems(items.filter((i) => i.id !== itemToDelete.id));
                setShowPopup(false);
                setItemToDelete(null);
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }



    return (
        <main>
            <NavMenu />
            <div className="container">
                <div className="add">
                    <button onClick={() => navigate('/add-item')}>Yemek Ekle</button>
                </div>
                <CategoryBar onCategorySelect={handleCategorySelect} />
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="item-box">
                            <img src={item.image} alt={item.title} className="item-image" />
                            <div className="item-details">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                            <div className="item-actions">
                                <span className="item-price">{item.price} ₺</span>
                                <button onClick={() => handleEdit(item.id)}>
                                    Düzenle
                                </button>
                                <button onClick={() => handleDeleteClick(item)}>
                                    Sil
                                </button>
                            </div>
                        </div>

                    ))
                ) : (
                    <div>No items found.</div>
                )}

                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <p>Bu yemeği silmek istediğinizden emin misiniz?</p>
                            <button onClick={confirmDelete}>Evet</button>
                            <button onClick={() => setShowPopup(false)}>Hayır</button>
                        </div>
                    </div>
                )}
            </div>
            
        </main>
    );
};

export default ShowItems;
