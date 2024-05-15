import "./List.scss";
import AddCard from "../Card/AddCard";

const ToDoList = ({ toDoList, setToDoList }) => {
  return (
    <>
      <div className="column__wrapper">
        <h2 className="column__title">{toDoList.name}</h2>
        <ul className="column__list">
          {toDoList.map((item) => (
            <li key={item.id} className="column__item">
              <input type="checkbox" className="column__item-copy" />
              {item.body}
              <button
                onClick={() => handleOnClick(item.id)}
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
