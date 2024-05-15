import "./List.scss"
import { FaPlus, FaSearch, FaTrash, FaCut, FaEdit } from 'react-icons/fa';
import AddCard from "../Card/AddCard";
import axios from "axios";

const ToDoList = ({ toDoList, setToDoList }) => {
  const handleOnClick = (commentId) => {
    async function deleteItem() {
      try {
        console.log(`Attempting to delete item with ID: ${commentId}`);
        await axios.delete(`http://localhost:8080/1/${commentId}`);
        const listRequest = await axios.get("http://localhost:8080/1/items");
        setToDoList(listRequest.data);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
    deleteItem();
  };

  return (
    <>
     <div className="column">
      <div className="column__wrapper">
        <h2 className="column__title">To Do List</h2>
        <ul className="column__list">
          {toDoList.map((item) => (
            <li key={item.comment_id} className="column__item">
              <input type="checkbox" className="column__item-copy" />
              <span className="column__item-text">{item.body}</span>
              <button
                onClick={() => handleOnClick(item.comment_id)}
                className="column__item-button"
              >
              <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <AddCard toDoList={toDoList} setToDoList={setToDoList} />
      </div>
      </div>
    </>
  );
};

export default ToDoList;
