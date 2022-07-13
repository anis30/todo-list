import React from "react";
import "./App.css";
import { TiEdit } from "react-icons/ti";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEdit, setTodoEdit] = React.useState(null);
  const [editText, setEditText] = React.useState("");

  React.useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []); //retrieve data

  React.useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]); //saving data in local storage

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEdit(null);
    setEditText("");
  }

  return (
    <div className="App">
      <h2>To Do Page</h2>
      <form className="todo-form">
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          className="todo-button"
          placeholder="Add a todo"
        />
        <button onClick={handleSubmit} className="todo-button">
          Add todo
        </button>
      </form>
      <div className="icons">
        {todos.map((todo) => (
          <div key={todo.id}>
            {todoEdit === todo.id ? (
              <input
                type="text"
                onChange={(e) => setEditText(e.target.value)}
                value={editText}
                className="todo-input edit"
              />
            ) : (
              <div classname="row">{todo.text}</div>
            )}

            {todoEdit === todo.id ? (
              <TiEdit onClick={() => editTodo(todo.id)} className="todo-input edit" />
            ) : (
              <TiEdit onClick={() => setTodoEdit(todo.id)} className="todo-button edit" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
