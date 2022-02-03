import React from 'react';
import Square from './Square';

export default function Board({ squares, click }) {
    return (
        <div className="board">
            {squares.map((v, i) => (
                <Square key={`board-${i}`} index={i + 1} value={v} click={() => click(i)} />
            ))}
        </div>
    );
};