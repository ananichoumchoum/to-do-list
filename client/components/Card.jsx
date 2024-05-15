import axios from "axios";
import { useState, useEffect } from "react";

const Card = ({setList}) => {
  const [item, setItem] = useState("");

  async function postItem() {
    const itemData = {
      listname: "inprogress",
      copy: item
    }
    const postRequest = await axios.post("http://localhost:8080/", itemData);
    const listRequest = await axios.get("http://localhost:8080/");
    setList(listRequest.data);
    setItem("");
  }

  const handleChangeItem = (event) => {
    setItem(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    postItem();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Add item"
        name="item"
        value={item}
        onChange={handleChangeItem}
      />
    </form>
  );
};

export default Card;
