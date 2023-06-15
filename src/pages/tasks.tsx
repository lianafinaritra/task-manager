import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useTaskManager, useTaskStore} from "@/store/useTaskManager";
import {useLocalStorage} from "@/hooks/useLocalStorage";

interface Task {
  id: number,
  title: string,
  completed: boolean,
}

const TaskManager = () => {
  const [newTitle, setNewTitle] = useState('');
  const {useSetValue, useCheckValue} = useLocalStorage();
  const {
     useUpdate,
     useCreate,
      useDelete,
      useSearch
   } = useTaskManager();
  const {tasks, currentTask} = useTaskStore();

  function HandleAddTask() {
    const newTask = {
      id: Date.now(),
      title: newTitle,
      completed: false,
    };
    useCreate(newTask);
    setNewTitle('');
    useSetValue();
  };

  function HandleUpdateTask (taskId: number, newTitle: string){
    useUpdate(taskId, newTitle);
      useSetValue();
  };

  function HandleDeleteTask(taskId: number) {
    useDelete(taskId);
      useSetValue();
  };

  function HandleSearch (e: ChangeEvent<HTMLInputElement>){
    useSearch(e.target.value);
  };

  /*const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(c.toLowerCase())
  );*/

    useEffect(() => {
        function GetTasks(){
            useCheckValue();
        }
        GetTasks();
    }, [])

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>

      <button onClick={HandleAddTask}>Add Task</button>

      <input type="text" onChange={HandleSearch} placeholder="Search Task" />

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                HandleUpdateTask(task.id, e.target.value )
              }
            />
            <button onClick={() => HandleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
