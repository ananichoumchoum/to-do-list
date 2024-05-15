import "./List.scss"
import axios from "axios";

const InProgressList = ({inProgressList, setInProgressList}) => {
  const handleOnClick = (event) => {
    async function deleteItem() {
      const deleteRequest = await axios.delete(
        `http://localhost:8080/2/${event}`
      );
      const listRequest = await axios.get("http://localhost:8080/1/items");
      setInProgressList(listRequest.data);
    }
    deleteItem();
  };


  return (
    <div className="column__wrapper">
    <h2 className="column__title">In Progress List</h2>
      <ul className="column__list">
        {inProgressList.map((item) => (
          <li key={item.comment_id} className="column__item">
            <input type="checkbox" className="column__item-copy"/>
            {item.body}
            <button onClick={() => handleOnClick(item.comment_id)} className="column__item-button">Del</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InProgressList;