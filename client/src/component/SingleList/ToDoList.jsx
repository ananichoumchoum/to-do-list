import "./List.scss";
import AddCard from "../Card/AddCard";
import axios from "axios";

const ToDoList = ({ toDoList, setToDoList }) => {
  const handleOnClick = (event) => {
    async function deleteItem() {
      const deleteRequest = await axios.delete(
        `http://localhost:8080/1/${event}`
      );
      console.log(deleteRequest);
      const listRequest = await axios.get("http://localhost:8080/1/items");
      setToDoList(listRequest.data);
    }
    deleteItem();
  };

  return (
    <>
      <div className="column__wrapper">
        <h2 className="column__title">To Do List</h2>
        <ul className="column__list">
          {toDoList.map((item) => (
            <li key={item.comment_id} className="column__item">
              <input type="checkbox" className="column__item-copy" />
              {item.body}
              <button
                onClick={() => handleOnClick(item.comment_id)}
                className="column__item-button"
              >
                Del
              </button>
            </li>
          ))}
        </ul>
        <AddCard toDoList={toDoList} setToDoList={setToDoList} />
      </div>
    </>
  );
};

export default ToDoList;
