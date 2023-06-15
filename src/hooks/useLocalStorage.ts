import {useEffect, useState} from "react";
import {Task, useTaskManager} from "@/store/useTaskManager";

const useLocalStorage = () => {
  const {useTaskStore} = useTaskManager();
  const {setTasks} = useTaskStore();
  const useCheckValue = () => {
    useEffect(() => {
      const check = localStorage.getItem('tasks');
      if(check){
        setTasks(JSON.parse(check));
      }
    }, [])
  }
  const useSetValue = (tasksValues: Task[]) => {
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasksValues));
    }, [])
  }
  return{useCheckValue, useSetValue}
}

export {
  useLocalStorage
}