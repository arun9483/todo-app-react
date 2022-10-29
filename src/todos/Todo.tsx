import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import classNames from 'classnames';

import {
  deleteTodo,
  toggleTodo,
  editTodo as changeTodoTitle,
  updateEditing,
} from './store/actions';
import { TodoAppContext } from './TodoApp';
import { ITodo } from './types';

import './Todo.css';

interface TodoProps {
  todo: ITodo;
}

function Todo(props: TodoProps) {
  const { editing, dispatchTodoAction, dispatchEditingAction } =
    useContext(TodoAppContext);

  const { todo } = props;

  const [editText, setEditText] = useState<string>(todo.title);
  const editTodo = useRef<HTMLInputElement>(null);

  const onChangeHandler = useCallback(() => {
    dispatchTodoAction(toggleTodo(todo));
  }, [todo, dispatchTodoAction]);

  const onDeleteHandler = useCallback(() => {
    dispatchTodoAction(deleteTodo(todo));
  }, [todo, dispatchTodoAction]);

  useEffect(() => {
    if (editing) {
      editTodo?.current?.focus();
    } else {
      editTodo?.current?.blur();
    }
  }, [editing]);

  const handleSubmit = () => {
    const val = editText.trim();
    if (val) {
      dispatchTodoAction(changeTodoTitle({ ...todo, title: val }));
    } else {
      onDeleteHandler();
    }
    dispatchEditingAction(updateEditing(''));
  };

  const handleEdit = useCallback(() => {
    dispatchEditingAction(updateEditing(todo.id));
    setEditText(todo.title);
  }, [todo, dispatchEditingAction]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditText(todo.title);
      dispatchEditingAction(updateEditing(''));
    } else if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editing) {
      setEditText(event.target.value);
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editing.editing === todo.id,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={onChangeHandler}
        />
        <label onDoubleClick={handleEdit}>{todo.title}</label>
        <button className="destroy" onClick={onDeleteHandler} />
      </div>
      <input
        className="edit"
        ref={editTodo}
        value={editText}
        onBlur={handleSubmit}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
}

export default Todo;
