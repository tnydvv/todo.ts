import React, { useEffect, useRef, useState } from "react";

interface IProps {
  id: string,
  name: string,
  completed: boolean,
  toggleTaskCompleted: (id: string) => void,
  deleteTask: (id: string) => void,
  editTask: (id: string, newName: string) => void
}

const Todo: React.FC<IProps> = ({ id, name, completed, toggleTaskCompleted, deleteTask, editTask }) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');

  const usePrevious = (value: boolean) => {
    const ref: React.MutableRefObject<boolean | undefined> = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const wasEditing = usePrevious(isEditing);

  const editFieldRef: any = useRef(null);
  const editButtonRef: any = useRef(null);

 

  const handleChange = (e: any) => {
    setNewName(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
  <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className={`${completed ? "strike" : ""} todo-label `} htmlFor={id} >
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
