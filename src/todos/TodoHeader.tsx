import React, { useState, useContext } from 'react';
import { TodoAppContext } from './TodoApp';
import { getActiveCount } from './util';

import { addTodo, toggleAll } from './store/actions';

var ENTER_KEY = 'Enter';

export default function TodoHeader() {
  const { todo, dispatchTodoAction } = useContext(TodoAppContext);

  const [newTodo, setNewTodo] = useState('');

  const flipAll = () => {
    dispatchTodoAction(toggleAll());
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
      dispatchTodoAction(
        addTodo({
          id: `todo-${Math.random()}`,
          title: val,
          completed: false,
        })
      );
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
        onChange={flipAll}
        checked={getActiveCount(todo.list) === 0}
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
