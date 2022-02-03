import React from 'react';
import { useLocation } from 'react-router-dom';

export default function GameOver() {
    const location = useLocation();
    const status = location.state ? location.state.status : `Oops! You didn't play the game`;

    return (
        <div className="wrap">
            <div className="status">
                <strong>{status}</strong>
            </div>
        </div>
    )
};