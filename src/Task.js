import React, { useReducer } from 'react'
import AddTask from './AddTask';
import Todos from './Todos';
import tasksReducer from './tasksReducer';

let nextId = 3;
const initialTasks = [
    {
        id: 0,
        text: 'Visit Kafka Museum',
        done: true
    },
    {
        id: 1,
        text: 'Watch a puppet show',
        done: false
    },
    {
        id: 2,
        text: 'Lennon Wall Pic',
        done: false
    }
]

export default function Task() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text){
    dispatch({
        type: 'added',
        id: nextId++,
        text: text
    })

  }

  function handleChangeTask(){

  }

  function handleDeleteTask(id){
    dispatch({
        type: 'deleted',
        id: id
    })
  }

  return (
    <div>
    <h1>Prague ITinArray</h1>

    <AddTask onAddTask={handleAddTask}></AddTask>
    <Todos tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask}></Todos>

    </div>
  )
}
