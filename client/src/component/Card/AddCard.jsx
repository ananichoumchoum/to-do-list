import axios from "axios";
import { useState } from "react";

const AddCard = ({ setToDoList }) => {
  const [item, setItem] = useState("");

  async function postItem() {
    const itemData = {
      list_id: 1,
      body: item,
    };
    console.log(itemData);
    const postRequest = await axios.post(`http://localhost:8080/1`, itemData);
    const listRequest = await axios.get("http://localhost:8080/1/items");
    setToDoList(listRequest.data);
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

export default AddCard;
