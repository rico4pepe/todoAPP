
import './App.css';
import AddTask from './componets/AddTask';
import Tasks from './componets/Tasks';
//hooks
import { useState, useEffect } from "react";

//Packages
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

 function App() {
  // need a state to keep track of todos
  const [todos, setTodos] = useState([]);
  // need state to keep track of the value in the input
  const [todo, setTodo] = useState("");

  // function to get the value of the input and set the new state
  function handleInputChange(e) {
    // set the new state value to what's currently in the input box
    setTodo(e.target.value);
  }

  // function to create a new object on form submit
  function handleFormSubmit(e) {
    // prevent the browser default behavior or refreshing the page on submit
    e.preventDefault();

    const id = uuidv4();
    

    // don't submit if the input is an empty string
    if (todo !== "") {
      // set the new todos state (the array)
      setTodos([
        // copy the current values in state
        ...todos,
        {
          // setting a basic id to identify the object
          id: id,
          // set a text property to the value of the todo state and 
          // trim the whitespace from the input
          text: todo.trim()
        }
      ]);

      Swal.fire({
        icon: 'success',
        title: 'Weldone',
        text: 'You have successfully added a new task!'
    })
    }

    // clear out the input box
    setTodo("");
  }


  // Fetching from Local Storage


  return (
    <div className="App">
      {/* create a form element and pass the handleFormSubmit function 
      to the form using the onSubmit prop */}
      <form onSubmit={handleFormSubmit}>
        {/* create an input element - make sure to add the value prop 
        with the state value passed in and the onChange prop to update
        the state every time something is typed in the input */}
        <input
          name="todo"
          type="text"
          placeholder="Create a new todo"
          value={todo}
          onChange={handleInputChange}
        />
        <button >Save me </button>
      </form>

      {/* create a ul to hold all of the list items */}
      <ul className="todo-list">
        {/* map over the todos array which creates a new li element for every todo
        (make sure to add the "key" prop using the unique todo.id value to the li element)
        remember this is an array of objects - so we need to access the property 
        "text" to get the value we want to display */}
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
