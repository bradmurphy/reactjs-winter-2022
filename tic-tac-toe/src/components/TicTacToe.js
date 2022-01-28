import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// components
import Board from './Board';

export default function TicTacToe() {
    const [players, setPlayers] = useState(null);
    const location = useLocation();

    const [ board, setBoard ] = useState(Array(9).fill(null));

    const click = (i) => {
        console.log('Clicked');
    };

    console.log(players);

    const status = players !== null ? `Player: ${players.human} | Computer: ${players.computer}` : 'Loading...';

    useEffect(() => {
        if (location.state && players === null) {
            const player = location.state.player;
            const computer = player === 'X' ? 'O' : 'X';

            setPlayers({
                human: player,
                computer
            });
        }
    }, [location, players])

    return (
        <div className="wrap">
            <div className="status">
                <strong>{status}</strong>
            </div>
            <Board squares={board} click={click} />
        </div>
    );
}