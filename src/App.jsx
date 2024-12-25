import React, { createContext, useEffect, useState } from 'react'
import './global.css'
import Board from './Board'
import ToggleButton from './ToggleButton'
export const ThemeContext = createContext();
const App = () => {
  const [theme, setTheme] = useState("light")

  const handleToggleTheme = () => {
    const html = document.querySelector("html");
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    setTheme(newTheme); // Update state and propagate the change
  };

  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <div className='w-full flex flex-row m-4 align-middle justify-center gap-4 items-center'>
        <h1 className='text-4xl text-fontColor font-bold'>Minesweeper</h1>
        <ToggleButton onClick={handleToggleTheme}/>
      </div>
      <ThemeContext.Provider value={{theme}}>
      <div>
        <Board grid={8} minesCount={10} />
      </div>
      </ThemeContext.Provider>
    </div>
  )
}

export default App

