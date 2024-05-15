import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

const ItemList = () => {
  const { itemId } = useParams();
  const [list, setList] = useState(null);

  useEffect(() => {
    fetchList();
  }, [itemId]);

  async function fetchList() {
    const listRequest = await axios.get("http://localhost:8080/");
    setList(listRequest.data);
  }

  async function deleteItem() {
    const deleteRequest = await axios.delete(`http://localhost:8080/${itemId}`);
    const listRequest = await axios.get("http://localhost:8080/");
    setList(listRequest.data);
  }

  const handleOnClick = (event) => {
    event.preventDefault();
    deleteItem();
  };

  if (!list) {
    return <div className="loader">loading..</div>;
  }

  return (
    <div>
      <h2>List of items</h2>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.copy}
            <button onClick={handleOnClick}>Del</button>
          </li>
        ))}
      </ul>
      <Card setList={setList} />
    </div>
  );
};

export default ItemList;
