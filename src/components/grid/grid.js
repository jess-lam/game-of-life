import React, {useState, useRef, useCallback, useEffect} from 'react';
import produce from 'immer';


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
    const [generation, setGeneration] = useState(0)
    const [speed, setSpeed] = useState(500)
    const [size, setSize] = useState({ numRows: 35, numCols: 35})
    

    const generateEmptyGrid = useCallback(() => {
      const rows = [];
            for (let i = 0; i < size.numRows; i++) {
                rows.push(Array.from(Array(size.numCols), () => 0));
            }
            return rows
    },[size.numRows, size.numCols])

    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid()
    });

    useEffect(() => {
      setGrid(() => generateEmptyGrid())
    },[generateEmptyGrid, size.numRows, size.numCols])


    const runningRef = useRef(running);
    runningRef.current = running

    const generationRef = useRef(generation);
    generationRef.current = generation

    const speedRef = useRef(speed);
    speedRef.current = speed

    const runSimulation = useCallback(() => {
      if (!runningRef.current) {
        return;
      }
      setGrid((g) => {
        return produce(g, gridCopy => {
          for (let i = 0; i < size.numRows; i++) {
            for (let j=0; j < size.numCols; j++) {
              let neighbors = 0;
              gridPoints.forEach(([x, y]) => {
                const newI = i + x;
                const newJ = j + y;
                if (newI >= 0 && newI < size.numRows &&
                  newJ < size.numCols) {
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
      setGeneration(generationRef.current + 1)
      setTimeout(runSimulation, speedRef.current);
    }, [size.numRows, size.numCols])

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
          {running ? 'Stop' : 'Start'}
          </button>
          <button onClick = {() => {
            const rows = [];
            for (let i = 0; i < size.numRows; i++) {
                rows.push(Array.from(Array(size.numCols), () => Math.random() > 0.5 ? 1 : 0));
            }
            setGrid(rows);

          }}>
            Random
          </button>

          <button onClick = {() => {
            setGrid(generateEmptyGrid());

          }}>
            Clear
          </button>

          <button onClick = {() => setSpeed(speedRef.current + 500)}>Slow</button>
          <button onClick = {() => setSpeed(500)}>Normal</button>
          <button onClick = {() => setSpeed(speedRef.current - 300)}>Fast</button>

          <button onClick = {() => setSize({numRows: 50, numCols: 50})}>Larger Grid</button>
          <button onClick = {() => setSize({numRows: 35, numCols: 35}) }>Regular Grid</button>
          <button onClick = {() => setSize({numRows: 25, numCols: 25}) }>Smaller Grid</button>

        <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${size.numRows}, 20px)`,
          gridTemplateColumns: `repeat(${size.numCols}, 20px)`
        }}>
          {grid.map((rows, i) => 
            rows.map((col, j) => (
              <div
              key ={`${i} - ${j}`} 
              onClick={() => {
                if (!running) {
                  const newGrid = produce(grid, gridCopy => {
                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                  })
                  setGrid(newGrid)
                } else {
                  return
                }
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
                <p>Generation: {generation}</p>
      </>

    )
}

export default Grid;