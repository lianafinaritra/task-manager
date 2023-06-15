import {create} from "zustand";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
}

type Store = {
  currentTask: Task | null | undefined;
  tasks: Task[];
};

type Action = {
  setCurrentTask:  (item: Task) => void;
  setTasks: (tasks: Task[]) => void;
};

export const useTaskStore = create<Store & Action>(set => ({
  currentTask: null,
  tasks: [],
  setCurrentTask: (item) => set(({ currentTask: item })),
  setTasks: (items) => set(({ tasks: items})),
}))

const useTaskManager = () => {
  const {tasks, setTasks, setCurrentTask} = useTaskStore();

  const useSearch = (title: string) => {
    const newTab: Task[] = tasks.filter(item => item.title === title);
    setCurrentTask(newTab[0]);
  }

  const useCreate = (newTask: Task) => {
    const newTab: Task[] = tasks;
    console.log(tasks);
    newTab.push(newTask);
    setTasks(newTab);
    console.log('TASK CREATED')
    console.log(tasks);
  }

  const useUpdate = (taskId: number, newTitle: string) => {
    const newTab: Task[] = tasks.filter(item => item.id !== taskId);
    newTab.push({id: taskId, title: newTitle, completed: false});
    setTasks(newTab);
  }

  const useDelete = (taskId: number) => {
    const newTab: Task[] = tasks.filter(item => item.id !== taskId);
    setTasks(newTab);
  }
 return {useUpdate, useCreate, useDelete, useSearch};
}

export {
  useTaskManager
}