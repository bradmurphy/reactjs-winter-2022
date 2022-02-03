import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { calculateWinner, isBoardEmpty, getBestMove, getRandomInt } from '../utilities';

// components
import Board from './Board';

export default function TicTacToe() {
    const [players, setPlayers] = useState(null);
    const [ board, setBoard ] = useState(Array(9).fill(null));
    const [ isXNext, setIsXNext ] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();
    const winner = calculateWinner(board);

    const isFull = board.filter((square) => square === null).length;
    const isDraw = isFull === 0 && winner === null;
    const status = `Next Player: ${isXNext ? 'X': 'O'}`;

    const selectSquare = useCallback((i) => {
        const boardCopy = [ ...board ];
        if (winner || boardCopy[i]) return;
        boardCopy[i] = isXNext ? 'X' : 'O';
        setBoard(boardCopy);
        setIsXNext(!isXNext);
    }, [board, isXNext, winner]);

    const click = (i) => selectSquare(i);

    useEffect(() => {
        if (
            (players !== null && players.computer === 'X' && isXNext) ||
            (players !== null && players.computer === 'O' && !isXNext)
        ) {
            const boardCopy = [ ...board ];
            const computer = players.computer;
            const computerMove = isBoardEmpty(boardCopy) ? getRandomInt(0, 8) : getBestMove(boardCopy, computer);

            const timeout = setTimeout(() => {
                selectSquare(computerMove);
            }, 500);

            return () => timeout && clearTimeout(timeout);
        }
    }, [ board, isXNext, players, selectSquare]);

    useEffect(() => {
        if (location.state && players === null) {
            const player = location.state.player;
            const computer = player === 'X' ? 'O' : 'X';

            setPlayers({
                human: player,
                computer
            });
        }
    }, [location, players]);

    useEffect(() => {
        if (winner !== null || isDraw) {
            navigate('/game-over', {state: { status: winner ? `Winner: Player ${winner}` : 'Draw!' }});
        }
    }, [navigate, isDraw, status, winner]);

    return location.state ? (
        <div className="wrap">
            <div className="status">
                <strong>{status}</strong>
            </div>
            <Board squares={board} click={click} />
        </div>
    ) : (
        <div className="status">
            <strong>
                Oops! You didn't select a player!
            </strong>
        </div>
    );
}