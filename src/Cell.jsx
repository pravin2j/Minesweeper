import React, { useContext, useEffect, useMemo } from 'react'
import { FaCircle } from "react-icons/fa";
import { PiFlagPennantFill } from "react-icons/pi";
import { ThemeContext } from './App';

const Cell = ({data, onClick, onRightClick}) => {

  const {theme} = useContext(ThemeContext)
  const bgColor = useMemo(()=> {
    const baseColorArray = ['bg-cyan-100','bg-cyan-200','bg-cyan-300','bg-cyan-400',
      'bg-cyan-500','bg-cyan-600 text-white','bg-cyan-700 text-white','bg-cyan-800 text-white',
    ]

    const colorArray = theme === 'dark' ? [...baseColorArray].reverse() : baseColorArray;

    if(data.revealed) {
      if(data.adjMines > 0) {
        return colorArray[data.adjMines-1]
        
      } else return 'bg-bgSecondary'
    } else return 'bg-gray-500'
  },[theme,data,data.revealed]);

  return (
    <div
      onClick={onClick}
      onContextMenu={(e)=> {
        e.preventDefault();
        onRightClick();
      }}
      className={`w-11 h-11 md:w-12 md:h-12 lg:w-12 lg:h-12 rounded-sm ${bgColor} text-2xl flex items-center justify-center cursor-pointer font-bold`}
    >
      {data.revealed && data.mine && <FaCircle className='text-fontColor'/>}
      {data.flagged && <PiFlagPennantFill className='text-fontColor'/>}
      {data.revealed && !data.mine && data.adjMines > 0 && data.adjMines}
    </div>
  )
}

export default Cell