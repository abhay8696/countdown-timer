import React from 'react';

const Button = ({toggleButton, timerON}) => {
    return (
        <button onClick={toggleButton}>
            {timerON ? "Cancel " : "Show "} Time
        </button>
    );
};

export default Button;