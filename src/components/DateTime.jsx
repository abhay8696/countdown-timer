import React from 'react';

const DateTime = ({changeTimer, value, inputErr}) => {
    return (
        <input 
            type="datetime-local" 
            onChange={changeTimer} 
            value={value} 
            className={inputErr ? "inputErr" : ""}
        />
    );
};

export default DateTime;