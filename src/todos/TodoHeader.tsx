import React, { useState, useContext } from 'react';
import { TodoAppContext } from './Todos';
import { getActiveCount } from './util';

import { TodoActionKind } from './todoTypes';

var ENTER_KEY = 'Enter';

export default function TodoHeader() {
  const { list, dispatchListAction } = useContext(TodoAppContext);

  const [newTodo, setNewTodo] = useState('');

  const toggleAll = () => {
    dispatchListAction({
      type: TodoActionKind.TOGGLE_ALL,
      payload: list[0],
    });
  };

  const newTodoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = newTodo.trim();

    if (val) {
      dispatchListAction({
        type: TodoActionKind.ADD,
        payload: {
          id: `todo-${Math.random()}`,
          title: val,
          completed: false,
        },
      });
      setNewTodo('');
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={toggleAll}
        checked={getActiveCount(list) === 0}
      />
      <label htmlFor="toggle-all" />
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={newTodoChangeHandler}
        onKeyDown={handleNewTodoKeyDown}
        autoFocus={true}
      />
    </header>
  );
}
