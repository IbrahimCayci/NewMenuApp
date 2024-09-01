import React from 'react';

const CategoryBar = ({onCategorySelect}) => {
    return (
        <div className="category-bar">
            <button onClick={() => onCategorySelect(1)}>&#199;orba</button>
            <button onClick={() => onCategorySelect(2)}>Ara S&#305;cak</button>
            <button onClick={() => onCategorySelect(3)}>Ana Yemek</button>
            <button onClick={() => onCategorySelect(4)}>Tatl&#305;lar</button>
            <button onClick={() => onCategorySelect(5)}>&#304;&#231;ecekler</button>
        </div>
    );
};

export default CategoryBar;