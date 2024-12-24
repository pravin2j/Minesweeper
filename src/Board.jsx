import React, { useEffect, useState } from 'react'
import createBoard from './createBoard';
import Cell from './Cell';

const Board = ({ grid, minesCount }) => {

    const [board, setBoard] = useState(createBoard(grid, minesCount));
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    const revealCell = (row, col) => {
        if (gameOver || board[row][col].revealed || board[row][col].flagged) return;
        if (gameOver) return;
        const newBoard = [...board]
        const cell = newBoard[row][col]
        cell.revealed = true;
        if (cell.mine) {
            revealAllMines()
            setWin(false)
            setGameOver(true)
        } else if (cell.adjMines === 0) {
            revealNeighbor(newBoard, row, col)
        }
        setBoard(newBoard)
    }

    const revealNeighbor = (newBoard, row, col) => {
        const dir = [
            [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
        ];

        for (let [dirX, dirY] of dir) {
            const adjRow = row + dirX;
            const adjCol = col + dirY;

            if (adjRow >= 0
                && adjCol >= 0
                && adjRow < grid
                && adjCol < grid
                && !newBoard[adjRow][adjCol].revealed
                && !newBoard[adjRow][adjCol].flagged) {
                newBoard[adjRow][adjCol].revealed = true;
                if (newBoard[adjRow][adjCol].adjMines === 0)
                    revealNeighbor(newBoard, adjRow, adjCol)
            }
        }
    }

    const handleFlagToggle = (row, col) => {
        const newBoard = [...board]
        if (gameOver || board[row][col].revealed) return;
        board[row][col].flagged = !board[row][col].flagged;
        setBoard(newBoard)
    }

    const checkWin = () => {
        const allRevealed = board.every(row =>
            row.every(col => (col.mine && !col.revealed) || (!col.mine && col.revealed))
        )
        if (allRevealed) {
            setWin(true);
            setGameOver(true);
        }

    }

    const revealAllMines = () => {
        const newBoard = [...board]
        newBoard.map(row => {
            row.map(col => {
                if (col.mine)
                    if (!col.flagged)
                        col.revealed = true;
                if (col.flagged)
                    if (!col.mine)
                        col.flagged = false;
            })
        })
        setBoard(newBoard)
    }

    const resetBoard = (e)=> {
        e.preventDefault()
        setBoard(createBoard(grid, minesCount))
        setGameOver(false)
        setWin(false)
    }

    useEffect(() => {
        checkWin()
    }, [board])


    const gridCols = `grid-cols-${grid}`
    return (
        <div>
            <div className='mb-4 p-1 rounded-lg flex flex-col items-center'>
                { gameOver && <div className="bg-gray-200 px-2 rounded-lg shadow-md text-3xl font-extrabold text-center">Game Over!</div> }
                {
                    gameOver && (win ? <div className="bg-gray-200 w-fit text-2xl px-2 rounded-b-lg shadow-md text-center">You Win!!!</div>
                        : <div className="bg-gray-200 w-fit text-2xl px-2 rounded-b-lg shadow-md text-center">You Lose...</div>)
                }

            </div>

            <div className={'grid gap-1 w-max'}
                style={{ gridTemplateColumns: `repeat(${grid}, 1fr)` }}
            >
                {board.map((row, rIndex) => {
                    return row.map((col, cIndex) => {
                        return <Cell
                            key={`${rIndex}-${cIndex}`}
                            data={col}
                            onClick={() => revealCell(rIndex, cIndex)}
                            onRightClick={() => handleFlagToggle(rIndex, cIndex)}
                        />
                    })
                })}
            </div>
            <div className='text-center m-4'>
                <button className='bg-blue-200 px-4 py-2 rounded-lg'
                onClick={resetBoard}>
                    Restart
                </button>
            </div>
        </div>
    )
}

export default Board

