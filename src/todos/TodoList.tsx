import React from 'react';
import { TodoListProps, ITodo } from './todoTypes';
import Todo from './Todo';

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
