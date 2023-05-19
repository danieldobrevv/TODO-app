import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setTodoList([...todoList, todo])
    setTodo("")
  };

  return (
    <div className="App">
      <h1> My TODO </h1>
      <h3> My TODO </h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={todo}
          placeholder="Write your task"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        ></input>
      </form>
      {todoList.map((task, index) => {
        return <p key={index}>{task}</p>;
      })}
    </div>
  );
}

export default App;
