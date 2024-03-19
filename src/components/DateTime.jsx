import React from 'react';

const DateTime = ({changeTimer, value}) => {
    return (
        <input type="datetime-local" onChange={changeTimer} value={value}/>
    );
};

export default DateTime;