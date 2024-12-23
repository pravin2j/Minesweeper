import React from 'react'
import { FaCircle } from "react-icons/fa";
import { PiFlagPennantFill } from "react-icons/pi";

const Cell = ({data, onClick, onRightClick}) => {
  return (
    <div
      onClick={onClick}
      onContextMenu={(e)=> {
        e.preventDefault();
        onRightClick();
      }}
      className={`w-5 h-5 border-blue-950 ${data.revealed ? `bg-gray-200`:'bg-gray-500'} flex items-center justify-center cursor-pointer text-black`}
    >
      {data.revealed && data.mine && <FaCircle />}
      {data.flagged && <PiFlagPennantFill />}
      {data.revealed && !data.mine && data.adjMines > 0 && data.adjMines}
    </div>
  )
}

export default Cell