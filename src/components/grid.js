import React, {useState, useRef, useCallback} from 'react'
import produce from 'immer';

const numRows = 25;
const numCols = 25;

const Grid = () => {
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        }
        return rows
    });

    console.log(grid);
    return (
        <div> Hi</div>

    )
}