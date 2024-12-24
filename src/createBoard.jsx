import React from 'react'
import Cell from './Cell';
import { MdOutlineSpa } from 'react-icons/md';

const createBoard = (grid, minesCount) => {
    const board = Array.from({ length: grid }, () => 
        Array.from({ length: grid }, () => ( {
            revealed: false,
            mine: false,
            flagged: false,
            adjMines: 0,
        } ))
    );
    
    let minePlaced = 0;
    while (minePlaced < minesCount) {
        let row = Math.floor(Math.random() * grid);
        let col = Math.floor(Math.random() * grid);
        if (!board[row][col].mine) {
            board[row][col].mine = true;
            minePlaced++;
        }
    }

    const dir = [
        [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
    ];

    for (let row = 0; row < grid; row++) {
        for (let col = 0; col < grid; col++) {
            if (board[row][col].mine) continue
            let count = 0;
            for (let [dirX, dirY] of dir) {
                const adjRow = row + dirX;
                const adjCol = col + dirY;
                if (adjRow >= 0
                    && adjCol >= 0
                    && adjRow < grid
                    && adjCol < grid
                    && board[adjRow][adjCol].mine)
                    count++;
            }
            board[row][col].adjMines = count;
        }
    }

    return board;
}

export default createBoard