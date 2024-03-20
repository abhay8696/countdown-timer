import React from 'react';
import "./card.css"

const Card = ({value, type}) => {
    return (
        <div className='card'>
            <span className='cardValue'>{value}</span>
            <span className='cardText'>{type}</span>
        </div>
    );
};

export default Card;