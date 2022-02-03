const isBoardEmpty = (squares) => {
    return squares.filter((square) => square === null).length === 9;
};

const isBoardFull = (squares) => {
    return squares.filter((square) => square === null).length === 0;
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
};

const calculateWinner = (squares) => {
    const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

const getBestMove = (squares, player) => {
    const opponent = player === 'X' ? 'O' : 'X';

    const minimax = (squares, isMax) => {
        const winner = calculateWinner(squares);

        // If a player wins, score is +1
        if (winner === player) return { square: -1, score: 1 };

        // If opponent wins, score is -1
        if (winner === opponent) return { square: -1, score: -1 };

        // If tie, score is 0
        if (isBoardFull(squares)) return { square: -1, score: 0 };

        // Initialize 'best'.  If isMax, we want to maximize the socre, and minimize otherwise.
        const best = { square: -1, score: isMax ? -1000 : 1000 };

        // Loop through every square on the board.
        for (let i = 0; i < squares.length; i++) {
            // If square is already filled, it's nota  valid move so skip it.
            if (squares[i]) {
                continue;
            }
            
            // If square is unfilled, then it's a valid move.  Play the square.
            squares[i] = isMax ? player: opponent;

            // Simulate the game until the end game and get the score,
            // by recursively calling minimax.
            const score = minimax(squares, !isMax).score

            // Undo the move
            squares[i] = null;

            if (isMax) {
                // Maximizing player;  trak the largest score and move.
                if (score > best.score) {
                    best.score = score;
                    best.square = i
                }
            } else {
                // Minimizing opponent;  track the smallest score and move.
                if (score < best.score) {
                    best.score = score;
                    best.square = i;
                }
            }
            
        }

        // The move that leads to the best score at the end of the game;
        return best;
    };

    // The best move for the 'opponent' given the current board.
    return minimax(squares, true).square;
};

export {
    isBoardEmpty,
    isBoardFull,
    getRandomInt,
    calculateWinner,
    getBestMove
}