import React from 'react';
import { ITodo } from './types';
import Todo from './Todo';

interface TodoListProps {
  todos: ITodo[];
}

function TodoList({ todos }: TodoListProps) {
  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map((todo: ITodo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
      </ul>
    </section>
  );
}

export default TodoList;
