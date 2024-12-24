import React from 'react'
import './global.css'
import Board from './Board'

const App = () => {
  
  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <h1 className='text-4xl m-4 font-bold'>Minesweeper</h1>
      
      <div>
        <Board grid={8} minesCount={10} />
      </div>
    </div>
  )
}

export default App

