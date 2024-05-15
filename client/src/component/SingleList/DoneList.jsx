import "./List.scss"
import { FaPlus, FaSearch, FaTrash, FaCut, FaEdit } from 'react-icons/fa';
import axios from 'axios'
const DoneList = ({ toDoList, setToDoList }) => {
    const text = 'this task is done'
    const handleOnClick = (commentId) => {
      async function deleteItem() {
        try {
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
          <h2 className="column__title">Task Done List</h2>
          <ul className="column__list">
          <li  className={`column__item column__item--1`}>
              <input type="checkbox" className="column__item-copy" />
              {text}
              <button
                onClick={() => handleOnClick(item.comment_id)}
                className="column__item-button"
              >
              <FaTrash />
              </button>
            </li>
          </ul>
        </div>
        </div>
      </>
    );
  };
  
  export default DoneList;