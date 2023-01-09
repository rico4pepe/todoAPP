import {FaPencilAlt, FaTimes} from 'react-icons/fa';
import '../index.css';

import React from 'react'

const Task = ({task, onDelete, onEdit}) => {
  return (
    <div>
        <div className="task">
            <div>
                <p className='taskName'>
                    <span className='textBold'> Task Name: </span> {task.text}
                </p>
            </div>
            <div>
                
            <p><FaTimes onClick={() => onDelete(task.id)} className="delIcon" /></p>
                <p><FaPencilAlt onClick={() => onEdit(task.id)} className="editIcon" /></p>
            </div>
        </div>
    </div>
  )
}

export default Task