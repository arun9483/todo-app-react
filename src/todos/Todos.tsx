import React, { useContext, useEffect } from 'react';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import { TodoAppContext } from './TodoApp';
import { TODO_APP_KEY } from './constants';

import './Todos.css';

export default function Todos(): JSX.Element {
  const { todo, filter } = useContext(TodoAppContext);
  useEffect(() => {
    try {
      localStorage.setItem(TODO_APP_KEY, JSON.stringify(todo));
    } catch {
      console.log('unable to save data in localStorage');
    }

    return () => {
      try {
        localStorage.setItem(TODO_APP_KEY, JSON.stringify(todo));
      } catch {
        console.log('unable to save data in localStorage');
      }
    };
  }, [todo]);

  return (
    <div className="todoapp">
      <TodoHeader />
      <TodoList
        todos={todo.list.filter((item) => {
          return !filter.filter
            ? true
            : filter.filter === 2
            ? item.completed
            : !item.completed;
        })}
      />
      <TodoFooter />
    </div>
  );
}
