import axios from "axios";
import { useState, useEffect } from "react";
import ToDoList from "../SingleList/ToDoList";
import InProgressList from "../SingleList/InProgressList";
import './Lists.scss'
import DoneList from "../SingleList/DoneList";

const List = () => {
  const [toDoList, setToDoList] = useState();
  const [inProgressList, setInProgressList] = useState();

  useEffect(() => {
    fetchLists();
  }, []);

  async function fetchLists() {
    try {
      const toDoListRequest = await axios.get("http://localhost:8080/1/items");
      setToDoList(toDoListRequest.data);
      const inProgressListRequest = await axios.get(
        "http://localhost:8080/2/items"
      );
      setInProgressList(inProgressListRequest.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!toDoList || !inProgressList) {
    return <div className="loader">loading..</div>;
  }

  return (
    <div className="lists">
      <ToDoList toDoList={toDoList} setToDoList={setToDoList} />
      <InProgressList inProgressList={inProgressList} setInProgressList={setInProgressList} />
      <DoneList inProgressList={inProgressList} setInProgressList={setInProgressList}/>
    </div>
  );
};

export default List;