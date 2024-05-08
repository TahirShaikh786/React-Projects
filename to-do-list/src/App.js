import "./App.css";
import { useState } from "react";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";

function App() {
  let [todolist, setodolist] = useState([]);

  let saveToDoList = (event) => {
    let toname = event.target.toname.value;

    if (!todolist.includes(toname)) {
      let finaltodolist = [...todolist, toname];
      setodolist(finaltodolist);
      NotificationManager.info(`${toname} Entered in Queue!`);
    } else {
      NotificationManager.warning(`${toname} Already Exist`);
    }

    event.preventDefault();
  };

  let list = todolist.map((value,i) => {
    return(
      <ToDoListItems value={value} key={i} indexNum={i} todolist={todolist} setodolist={setodolist} />
    )
  })

  return (
    <div className="App">
      <NotificationContainer />
      <h1>To-Do List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name="toname" />
        <button>Save</button>
      </form>

      <div className="outerDiv">
        <ul>
          {list}
        </ul>
      </div>
    </div>
  );
}

export default App;

function ToDoListItems({value,indexNum,todolist,setodolist}) {
  let [status,setstatus] = useState(false);

  let deleteRow=()=>{
    let finalData = todolist.filter((v,i)=>i!=indexNum)
    NotificationManager.error('Item Deleted!');
    setodolist(finalData);
  }

  let checkStatus=()=>{
    setstatus(!status);
    NotificationManager.success('Work Has Been Completed.')
  }

  return (
    <li className={(status) ? 'completetodo' : ''}>
      {indexNum+1} {value}
      <div className="innerDiv">
        <span onClick={checkStatus}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span onClick={deleteRow}>
        <FontAwesomeIcon icon={faTrashCanArrowUp} />
        </span>
      </div>
    </li>
  );
}
