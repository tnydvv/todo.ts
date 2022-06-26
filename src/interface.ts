export interface ITodo {
  id: string;
  name: string;
  completed: boolean;
}

export interface IFilterButtonProps {
  isPressed: boolean;
  name: string;
  setFilter: (name: string) => void;
}

export interface IFormProps {
  addTask: (name: string) => void;
}

export interface ITodoProps {
  id: string;
  name: string;
  completed: boolean;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newName: string) => void;
}

export interface IAppProps {
	todos: ITodo[]
}
