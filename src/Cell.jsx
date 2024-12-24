import React, { useEffect } from 'react'
import { FaCircle } from "react-icons/fa";
import { PiFlagPennantFill } from "react-icons/pi";

const Cell = ({data, onClick, onRightClick}) => {
  const cellBgColor = ()=> {
    const colorArray = ['bg-blue-100','bg-blue-200','bg-blue-300','bg-blue-400',
      'bg-blue-500','bg-blue-600 text-white','bg-blue-700 text-white','bg-blue-800 text-white',
    ]
    if(data.revealed) {
      if(data.adjMines > 0) {
        return colorArray[data.adjMines-1]
      } else return 'bg-gray-200'
    } else return 'bg-gray-500'
  }

  var bgColor = cellBgColor()
  return (
    <div
      onClick={onClick}
      onContextMenu={(e)=> {
        e.preventDefault();
        onRightClick();
      }}
      className={`w-7 h-7 rounded-sm ${bgColor} text-2xl flex items-center justify-center cursor-pointer text-blue-[250]`}
    >
      {data.revealed && data.mine && <FaCircle />}
      {data.flagged && <PiFlagPennantFill />}
      {data.revealed && !data.mine && data.adjMines > 0 && data.adjMines}
    </div>
  )
}

export default Cell