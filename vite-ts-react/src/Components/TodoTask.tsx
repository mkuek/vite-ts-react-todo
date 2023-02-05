import React from 'react'
import { ITask } from '../interfaces'

interface Props {
    task: ITask;
    handleDelete(taskIdToDelete: any): void;
    editTask(task:ITask):void
}

const TodoTask = ({task, handleDelete,editTask }: Props) => {
  return (
      <div className='todoList' style={{display:'flex', margin:'10px'}}>
          <div className='todos'>
            <h3>Task Name: {task.taskName}</h3>
            <h4>Days to Complete: {task.days}</h4>
          </div>
          <button onClick={() => {handleDelete(task.taskId) }}>X</button>
          <button onClick={() => {editTask(task) }}>Edit Task</button>
      </div>
  )
}

export default TodoTask