import React from 'react';

const DateTime = ({changeTimer}) => {
    return (
        <input type="datetime-local" onChange={changeTimer}/>
    );
};

export default DateTime;