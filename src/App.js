
import './App.css';


import { useState, useEffect } from "react";


import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import {FaPencilAlt, FaTimes} from 'react-icons/fa';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


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
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log("Hello ", currentTodo);
  }


  function handleUpdateTodo(id, updatedTodo) {
 
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
  
    setIsEditing(false);
  
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
           <Form className="add-form" onSubmit={handleEditFormSubmit}>
           <div className="">
           <div class="col-md-12 text-center">
           <label>Edit To Do List</label>
           </div>
           
           <Row>
        <Form.Group className="mb-3">
        <Form.Control 
        name="todo"
        type="text"
        placeholder="Edit todo"
        value={currentTodo.text}
        onChange={handleEditInputChange}
        />
      </Form.Group>
        </Row>
        <div class="col-md-12 text-center">
            <Button  variant="primary" type="submit"> Update Task</Button >&nbsp;&nbsp;
            <Button  variant="warning" type="submit" onClick={() => setIsEditing(false)}>Cancel</Button >
             </div>
            </div>
           </Form>
      ) : (
        <Form className="add-form" onSubmit={handleFormSubmit}>
        <div className="">
        <div class="col-md-12 text-center">
        <label className='Mylabel'>My To Do List</label>
        </div>

        <Row>
        <Form.Group className="mb-3">
        <Form.Control placeholder="Create a new todo"   value={todo}  onChange={handleInputChange}/>
      </Form.Group>
        </Row>
        <Row> 
          <Button  variant="primary" type="submit"> Add Task</Button >
        </Row>
          </div>
        </Form>
      )}
     


      <Table striped bordered hover>
      <thead>
        <tr>
         
          <th>Task</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
     
      </Table>


    </div>
  );
}

export default App;
