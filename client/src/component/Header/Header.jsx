import axios from "axios";

const Header = () => {
  const api_url = "https://zenquotes.io/api/quotes/";

  async function getQuote() {
    const getRequest = await axios.get("https://zenquotes.io/api/quotes/");
    const data = getRequest.json()
    console.log(data);
  }

  getQuote();

  return (
    <div>
      <h1>Quote</h1>
    </div>
  );
};

export default Header;
