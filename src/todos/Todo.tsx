import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import classNames from 'classnames';

import { TodoProps, TodoActionKind, EditingActionKind } from './todoTypes';
import { TodoAppContext } from './Todos';

import './Todo.css';

function Todo(props: TodoProps) {
  const { editing, dispatchListAction, dispatchEditingAction } =
    useContext(TodoAppContext);

  const { todo } = props;

  const [editText, setEditText] = useState<string>(todo.title);
  const editTodo = useRef<HTMLInputElement>(null);

  const onChangeHandler = useCallback(() => {
    dispatchListAction({
      type: TodoActionKind.TOGGLE_STATUS,
      payload: todo,
    });
  }, [todo, dispatchListAction]);

  const onDeleteHandler = useCallback(() => {
    dispatchListAction({
      type: TodoActionKind.DELETE,
      payload: todo,
    });
  }, [todo, dispatchListAction]);

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
      dispatchListAction({
        type: TodoActionKind.EDIT,
        payload: { ...todo, title: val },
      });
    } else {
      onDeleteHandler();
    }
    dispatchEditingAction({
      type: EditingActionKind.UPDATE_EDITING_INFO,
      payload: '',
    });
  };

  const handleEdit = () => {
    dispatchEditingAction({
      type: EditingActionKind.UPDATE_EDITING_INFO,
      payload: todo.id,
    });
    setEditText(todo.title);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditText(todo.title);
      dispatchEditingAction({
        type: EditingActionKind.UPDATE_EDITING_INFO,
        payload: '',
      });
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
        editing: editing === todo.id,
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
