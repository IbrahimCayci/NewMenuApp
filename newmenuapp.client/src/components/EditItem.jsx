import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditItem.css";

const EditItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/item/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setItem(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/item/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        })
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Error updating item:", error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="edit-item-container">
            <h3>Yeme&#287;i D&#252;zenle</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    &#304;sim:
                    <input
                        type="text"
                        value={item.title}
                        onChange={(e) => setItem({ ...item, title: e.target.value })}
                    />
                </label>
                <label>
                    A&#231;&#305;klama:
                    <textarea
                        value={item.description}
                        onChange={(e) =>
                            setItem({ ...item, description: e.target.value })
                        }
                    />
                </label>
                <label>
                    G&#246;rsel Ba&#287;lant&#305;s&#305;:
                    <div className="edit-item-image">
                        <img src={item.image} alt={item.title} />
                    </div>
                    <input
                        type="text"
                        value={item.image}
                        onChange={(e) => setItem({ ...item, image: e.target.value })}
                    />
                </label>
                <label>
                    Fiyat:
                    <input
                        type="number"
                        value={item.price}
                        onChange={(e) => setItem({ ...item, price: e.target.value })}
                    />
                </label>
                <label>
                    Kategori:&nbsp;&nbsp;
                    <select
                        value={item.itemType}
                        onChange={(e) => setItem({ ...item, itemType: parseInt(e.target.value) })}
                    >
                        <option value={1}>&#199;orba</option>
                        <option value={2}>Ara S&#305;cak</option>
                        <option value={3}>Ana Yemek</option>
                        <option value={4}>Tatl&#305;</option>
                        <option value={5}>&#304;&#231;ecek</option>
                    </select>
                </label>
                <button type="submit">Kaydet</button>
            </form>
        </div>
    );
};

export default EditItem;
