import React from 'react'
import Task from './Task'

const Tasks = (tasks, onDelete, onEdit) => {
  return (
    tasks.map(() =>(
        <Task key={tasks.id} task={tasks} onDelete = {onDelete} onEdit = {onEdit} />
    ))
   
  )
}

export default Tasks