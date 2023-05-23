import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState({ text: "", isDone: false });
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.text) return;
    setTodoList([...todoList, todo]);
    setTodo({ text: "", isDone: false });
  };

  const handleIsDone = (e) => {
    const newArr = todoList.map((item) => {
      if (item.text === e.target.innerText) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });

    setTodoList(newArr);
  };

  return (
    <div className="app">
      <h1> My TODO </h1>
      <form data-testid="form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={todo.text}
          placeholder="Write your task"
          onChange={(e) => {
            setTodo({ text: e.target.value, isDone: false });
          }}
        ></input>
      </form>
      {todoList.map((task, index) => {
        return (
          <p
            data-testid="todo"
            className={`${task.isDone ? "done" : null}`}
            onClick={(e) => {
              handleIsDone(e);
            }}
            key={index}
          >
            {task.text}
          </p>
        );
      })}
      <button
        onClick={() => {
          setTodoList([]);
        }}
      >
        Delete all
      </button>
    </div>
  );
}

export default App;
