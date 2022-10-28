import React, { useContext, useState } from 'react';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import { TodoAppContext } from './Todos';

import './Todos.css';

export default function Todos(): JSX.Element {
  const { list, filter } = useContext(TodoAppContext);
  return (
    <div className="todoapp">
      <TodoHeader />
      <TodoList
        todos={list.filter((item) => {
          return !filter
            ? true
            : filter === 2
            ? item.completed
            : !item.completed;
        })}
      />
      <TodoFooter />
    </div>
  );
}
