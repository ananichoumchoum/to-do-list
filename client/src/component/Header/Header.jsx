import axios from "axios";
import { useEffect, useState } from "react";
import "./Header.scss"

const Header = () => {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const API_URL = "https://zenquotes.io/api/quotes/";

  async function getQuote() {
    const getRequest = await axios.get(`${API_URL}`);
    const quote = getRequest.data[0].q;
    const author = getRequest.data[0].a;
    setQuote(quote);
    setAuthor(author);
    console.log(getRequest.data[0].q);
  }

  useEffect(() => {
    getQuote();
    const intervalId = setInterval(() => {
      getQuote();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [])

  return (
    <div className="header">
      <h1 className="header__title">{quote}</h1>
      <p className="header__subtitle">{author}</p>
    </div>
  );
};

export default Header;
