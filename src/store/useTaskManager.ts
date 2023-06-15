import {create} from "zustand";

export type Task = {
  id: string;
  title: string;
}

type Store = {
  currentTask: Task | null | undefined;
  tasks: Task[];
};

type Action = {
  setCurrentTask:  (item: Task) => void;
  setTasks: (tasks: Task[]) => void;
};

const useTaskManager = () => {
  const useTaskStore = create<Store & Action>(set => ({
    currentTask: null,
    tasks: [],
    setCurrentTask: (item) => set(({ currentTask: item })),
    setTasks: (items) => set(({ tasks: items})),
  }))

  const useSearch = (taskParam: Task) => {
    const {currentTask, tasks, setCurrentTask} = useTaskStore();
    const newTab: Task[] = tasks.filter(item => item.title === taskParam.title);
    setCurrentTask(newTab[0]);
  }

  const useCreate = (newTask: Task) => {
    const {tasks, setTasks} = useTaskStore();
    const newTab: Task[] = tasks;
    newTab.push(newTask);
    setTasks(newTab);
  }

  const useUpdate = (taskId: string, newTitle: string) => {
    const {tasks, setTasks} = useTaskStore();
    const newTab: Task[] = tasks.filter(item => item.id !== taskId);
    newTab.push({id: taskId, title: newTitle});
    setTasks(newTab);
  }

  const useDelete = (taskParam: Task) => {
    const {tasks, setTasks} = useTaskStore();
    const newTab: Task[] = tasks.filter(item => item.title !== taskParam.title);
    setTasks(newTab);
  }
 return {useUpdate, useTaskStore, useCreate, useDelete, useSearch};
}

export {
  useTaskManager
}