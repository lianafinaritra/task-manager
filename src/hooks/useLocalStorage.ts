import {useEffect} from "react";
import {useTaskStore} from "@/store/useTaskManager";
const useLocalStorage = () => {
  const {tasks, setTasks} = useTaskStore();
  const useCheckValue = () => {
      const check = localStorage.getItem('tasks');
      if(check){
        setTasks(JSON.parse(check));
      }
  }
  const useSetValue = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  return{useCheckValue, useSetValue}
}

export {
  useLocalStorage
}