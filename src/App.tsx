import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";

import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

import { IAppProps, ITodo } from "./interface";

const usePrevious = (value: number): number => {
  const ref = useRef<number>(0);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const setToLocal = (tasksToSave: ITodo[]) => {
  window.localStorage.clear();
  window.localStorage.setItem("tasks", JSON.stringify(tasksToSave));
};

const FILTER_MAP: any = {
  All: () => true,
  Active: (task: ITodo) => !task.completed,
  Completed: (task: ITodo) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const App: React.FC<IAppProps> = ({ todos: task }) => {
  let savedTasks = JSON.parse(window.localStorage.getItem("tasks") || "{}");
  console.log(savedTasks);

  if (savedTasks == null || savedTasks.length === 0) {
    savedTasks = task;
  }

  const [tasks, setTasks] = useState(savedTasks);
  const [filter, setFilter] = useState<string>("All");

  const addTask = (name: string) => {
    const newTask: ITodo = {
      id: "todo-" + nanoid(),
      name: name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setToLocal([...tasks, newTask]);
  };

  const toggleTaskCompleted = (id: string) => {
    const updatedTasks = tasks.map((task: ITodo) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    setToLocal(updatedTasks);
  };

  const editTask = (id: string, newName: string) => {
    const editedTaskList = tasks.map((task: ITodo) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
    setToLocal(editedTaskList);
  };

  const deleteTask = (id: string) => {
    const remainingTasks = tasks.filter((task: ITodo) => id !== task.id);
    setTasks(remainingTasks);
    setToLocal(remainingTasks);
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task: ITodo) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(document.createElement("h2")); //
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  window.localStorage.setItem("items", JSON.stringify(tasks));

  return (
    <div className="todoapp stack-large">
      <h1>Todo</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
};

export default App;
