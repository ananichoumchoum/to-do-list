import axios from "axios";
import { useEffect, useState } from "react";
import logo from '../../assets/images/logo.png'; 
import "./Header.scss"

const Header =  ({ isDarkMode, toggleTheme }) => {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const API_URL = "https://zenquotes.io/api/quotes/";

  async function getQuote() {
    const getRequest = await axios.get(`${API_URL}`);
    const quote = getRequest.data[0].q;
    const author = getRequest.data[0].a;
    setQuote(quote);
    setAuthor(author);
  }

  useEffect(() => {
    getQuote();
    const intervalId = setInterval(() => {
      getQuote();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [])

  return (
    <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="header__title">{quote}</h1>
      <p className="header__subtitle">{author}</p>
      <label className="switch">
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      <span className="slider"></span>
    </label>
    </div>
  );
};

export default Header;
