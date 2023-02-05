import { useState, ChangeEvent, SetStateAction } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ITask } from './interfaces'
import TodoTask from './Components/TodoTask'
import {v4 as uuidv4} from 'uuid';

function App() {
  const [count, setCount] = useState<number>(0)
  const [task, setTask] = useState<string | undefined>(undefined)
  const [days, setDays] = useState<number | undefined>(undefined)
  const [toDoList, setToDoList] = useState<ITask[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editId, setEditId] =  useState<any>(null)

  const handleChange = (e:ChangeEvent<HTMLInputElement>):void => {
    if (e.target.name == 'taskName') {
      setTask(e.target.value)
    } else {
      setDays(Number(e.target.value))
    }
  }

  const handleSubmit = (): void => {
    const newTask = {taskName: task, days: days, taskId:uuidv4()}
    setToDoList([...toDoList, newTask])
    setTask(undefined)
    setDays(undefined)
  }

  const handleDelete = (taskIdToDelete:any): void => {
    setToDoList(toDoList.filter((task) => {
      return task.taskId != taskIdToDelete
    }))
  }

  const editTask = (task:ITask): void => {
    setTask(task.taskName)
    setDays(task.days)
    setIsEditing(true)
    setEditId(task.taskId)
  }

  const cancelEdit = (): void => {
    setIsEditing(false)
    setTask(undefined)
    setDays(undefined)
  }

  const handleEditSubmit = (): void => {
    const editTaskId = [...toDoList].map((todo) => {
      if (todo.taskId === editId) {
        todo.taskName = task
        todo.days = days
        todo.taskId = editId
      }
      return todo
    })
    console.log(editTaskId)
    setToDoList(editTaskId)
    setTask(undefined)
    setDays(undefined)
  }

  return (
    <div className="App">
      <div className='header'>
        <input type='text' name='taskName' placeholder='test'onChange={handleChange} value={task}/>
        <input type='number' name='days' placeholder='days to complete' onChange={handleChange} value={days}/>
        {isEditing === true ?
          <div>
            <button onClick={handleEditSubmit}>Update Task</button>
            <button onClick={cancelEdit}>Cancel Edit</button>
          </div>  :
          <button onClick={handleSubmit}>Add Task</button>}
      </div>
      <div className="todoList">
        {toDoList.map((task:ITask, key:number) => {
          return <TodoTask key={key} task={task} handleDelete={handleDelete} editTask={editTask} />
        })}
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Increase Counter
        </button>
        <div>
          count is {count}
        </div>
        <button onClick={() => setCount((count) => count - 1)}>
          Decrease Counter
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
