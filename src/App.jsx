import React from 'react'
import './global.css'
import Board from './Board'

const App = () => {
  
  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <h1>Minesweeper</h1>
      <div>
        <Board grid={6} minesCount={1} />
      </div>
    </div>
  )
}

export default App

