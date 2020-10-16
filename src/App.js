import React, {useState, useRef, useCallback} from 'react'
import produce from 'immer';

const numRows = 25;
const numCols = 25;

const gridPoints = [
  [0, 1],
  [0, -1],
  [1,-1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
]

const Grid = () => {
    const [running, setRunning] = useState(false);
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        }
        return rows
    });


    const runningRef = useRef(running);
    runningRef.current = running
    const runSimulation = useCallback(() => {
      if (!runningRef.current) {
        return;
      }
      setGrid((g) => {
        return produce(g, gridCopy => {
          for (let i = 0; i < numRows; i++) {
            for (let j=0; j < numCols; j++) {
              let neighbors = 0;
              gridPoints.forEach(([x, y]) => {
                const newI = i + x;
                const newJ = j + y;
                if (newI >= 0 && newI < numRows &&
                  newJ < numCols) {
                    neighbors += g[newI][newJ] 
                  }
              })
              if (neighbors < 2 || neighbors > 3) {
                gridCopy[i][j] = 0;
              } else if (g[i][j] === 0 && neighbors === 3) {
                gridCopy[i][j] = 1;
              }
    
            }
          }

        })

      })

      setTimeout(runSimulation, 1000);
    }, [])

    console.log(grid);
    return (
      <>
        <button
        onClick = {() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
        >
          {running ? 'Stop' : 'Start'}</button>
        <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}>
          {grid.map((rows, i) => 
            rows.map((col, j) => (
              <div
              key ={`${i} - ${j}`} 
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                })
                setGrid(newGrid)
              }}
                style= {{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][j] ? 'pink' : undefined,
                  border: 'solid 1px black'
                  }}
                />
              ))
            )}
        </div>
      </>

    )
}

export default Grid;
