import './App.scss'
import Home from './pages/Home/Home'
import Header from "./component/Header/Header";
import { useState, useEffect  } from 'react'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
    <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    <Home />
  </div>
  )
}

export default App
