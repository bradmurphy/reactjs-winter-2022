import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Start () {
    const navigate = useNavigate();

    const selectPlayer = (player) => {
        navigate('/play', { state: { player }});
    }

    return (
        <div className="wrap">
            <h1 className="select-text">Pick your poison</h1>
            <div className="select-wrap">
                <button className="select-button" onClick={() => selectPlayer('X')}>X</button>
                <button className="select-button" onClick={() => selectPlayer('0')}>O</button>
            </div>
        </div>
    )
}