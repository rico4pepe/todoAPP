
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


  const [isEditing, setIsEditing] = useState(false);
  // object state to set so we know which todo item we are editing
  const [currentTodo, setCurrentTodo] = useState({});
 
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
 
    setTodos(removeItem);

    localStorage.setItem("todos", JSON.stringify(removeItem));
  }


  function handleEditInputChange(e) {
    // set the new state value to what's currently in the edit input box
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }


  function handleUpdateTodo(id, updatedTodo) {
 
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    // set editing to false because this function will be used inside a onSubmit function - which means the data was submited and we are no longer editing
    setIsEditing(false);
    // update the todos state with the updated todo
    setTodos(updatedItem);
    Swal.fire({
          icon: 'success',
          title: 'Yay...',
          text: 'You have successfully edited an existing task!'
      })
    localStorage.setItem("todos", JSON.stringify(updatedItem));
  }

//   function handleEditClick(id) {
   
//     const text = prompt("Task Name");
//     console.log("Hello i gtot here ", text, "Get Id also", id);
  
//     let data = JSON.parse(localStorage.getItem('todos'));
//     const myData = data.map(x => {
    
//       if (x.id === id) {

    
//           return {
//               ...x,
//               text: text.trim(),
//               id: uuidv4()
//           }
//       }
//       return x;
//   })
//   Swal.fire({
//     icon: 'success',
//     title: 'Yay...',
//     text: 'You have successfully edited an existing task!'
// })
// localStorage.setItem("todos", JSON.stringify(myData));
// window.location.reload();

//   }


function handleEditClick(todo) {
  // set editing to true
  setIsEditing(true);
  // set the currentTodo to the todo item that was clicked
  setCurrentTodo({ ...todo });
}


function handleEditFormSubmit(e) {
  e.preventDefault();

  // call the handleUpdateTodo function - passing the currentTodo.id and the currentTodo object as arguments
  handleUpdateTodo(currentTodo.id, currentTodo);
}

  return (
    <div className="App">



   
      {isEditing ? (
           <form className="add-form" onSubmit={handleEditFormSubmit}>
           <div className="form-control">
           <label>Edit To Do List</label>
             <input
               name="todo"
               type="text"
               placeholder="Create a new todo"
               value={currentTodo.Text}
               onChange={handleEditInputChange}
             />
             <button className="btn btn-block"> Update Task</button>
             <button className="btn btn-block-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
             </div>
           </form>
      ) : (
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
      )}
     


      <table class="table-style">
      {todos.map((todo) => (
        <tr key={todo.id}>
          <td>
          {todo.text} 
          </td>
          <td>
          <FaTimes onClick={() => handleDeleteClick(todo.id)} className="delIcon" /> &nbsp;  <FaPencilAlt onClick={() => handleEditClick(todo)} className="editIcon" />
          </td>
        </tr>
        ))}
      </table>


    </div>
  );
}

export default App;
