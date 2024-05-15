import "./List.scss"
import axios from "axios";
import { FaPlus, FaSearch, FaTrash, FaCut, FaEdit } from 'react-icons/fa';

const InProgressList = ({inProgressList, setInProgressList}) => {
  const handleOnClick = (commentId) => {
    async function deleteItem() {
      try {
        await axios.delete(`http://localhost:8080/1/${commentId}`);
        const listRequest = await axios.get("http://localhost:8080/1/items");
        setInProgressList(listRequest.data);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
    deleteItem();
  };


  return (
    <div className="column">
    <div className="column__wrapper">
    <h2 className="column__title">In Progress List</h2>
      <ul className="column__list">
        {inProgressList.map((item) => (
          <li key={item.comment_id} className="column__item">
            <input type="checkbox" className="column__item-copy"/>
            <span className="column__item-text">{item.body}</span>
            <button onClick={() => handleOnClick(item.comment_id)} className="column__item-button"><FaTrash /></button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default InProgressList;