
import './App.css';


import { useState, useEffect } from "react";


import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import {FaPencilAlt, FaTimes} from 'react-icons/fa';

 function App() {

  const [todos, setTodos] = useState([]);

  const [todo, setTodo] = useState("");
  const getTasks = JSON.parse(localStorage.getItem("todos"));
  useEffect(() => {
      if (getTasks === null) {
        setTodos([])
      } else {
        setTodos(getTasks);
      }
  }, [])
 
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
        title: 'Yay...',
        text: 'You have successfully added a new task!'
    })

    localStorage.setItem("todos", JSON.stringify([...todos, {id:id, text:todo.trim()}]));

      
    }

    // clear out the input box
    setTodo("");
  }


  function handleDeleteClick(id) {
   
    const removeItem = todos.filter((todo) => {
     
      return todo.id !== id;
    });
    // removeItem returns a new array - so now we are setting the todos to the new array
    setTodos(removeItem);

    localStorage.setItem("todos", JSON.stringify(removeItem));
  }

  function handleEditClick(id) {
    // here we are filtering - the idea is remove an handleEditClickitem from the todo array on a button click
    const text = prompt("Task Name");
    console.log("Hello i gtot here ", text, "Get Id also", id);
  
    let data = JSON.parse(localStorage.getItem('todos'));
    const myData = data.map(x => {
    
      if (x.id === id) {

    
          return {
              ...x,
              text: text.trim(),
              id: uuidv4()
          }
      }
      return x;
  })
  Swal.fire({
    icon: 'success',
    title: 'Yay...',
    text: 'You have successfully edited an existing task!'
})
localStorage.setItem("todos", JSON.stringify(myData));
window.location.reload();

  }

  return (
    <div className="App">
   
      
      <form className="add-form" onSubmit={handleFormSubmit}>
      <div className="form-control">
      <label>My To DO List</label>
        <input
          name="todo"
          type="text"
          placeholder="Create a new todo"
          value={todo}
          onChange={handleInputChange}
        />
        <button className="btn btn-block"> Add Task</button>
        </div>
      </form>


      <table class="table-style">
      {todos.map((todo) => (
        <tr key={todo.id}>
          <td>
          {todo.text} 
          </td>
          <td>
          <FaTimes onClick={() => handleDeleteClick(todo.id)} className="delIcon" /> ||  <FaPencilAlt onClick={() => handleEditClick(todo.id)} className="editIcon" />
          </td>
        </tr>
        ))}
      </table>


    </div>
  );
}

export default App;
