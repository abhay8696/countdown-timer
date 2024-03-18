import React from 'react';

const Card = ({value, type}) => {
    return (
        <div>
            <h2>{value}</h2>
            <h3>{type}</h3>
        </div>
    );
};

export default Card;