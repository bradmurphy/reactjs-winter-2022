import React from 'react';

export default function Square({click, index, value}) {
    return (
        <div className={`tile tile--${index}`} onClick={click}>
            {value}
        </div>
    )
};