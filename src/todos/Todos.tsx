import React, { useContext } from 'react';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import { TodoAppContext } from './TodoApp';

import './Todos.css';

export default function Todos(): JSX.Element {
  const { todo, filter } = useContext(TodoAppContext);
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
