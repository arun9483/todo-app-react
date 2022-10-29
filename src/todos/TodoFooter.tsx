import React, { useContext } from 'react';
import classNames from 'classnames';

import { TodoAppContext } from './TodoApp';
import { updateFilter, clearCompleted } from './store/actions';
import { getActiveCount } from './util';

import './TodoFooter.css';

function TodoFooter() {
  const { todo, filter, dispatchFilterAction, dispatchTodoAction } =
    useContext(TodoAppContext);

  const count = getActiveCount(todo.list);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> {count > 1 ? 'items' : 'item'} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({ selected: filter.filter === 0 })}
            onClick={(event) => {
              event.preventDefault();
              dispatchFilterAction(updateFilter(0));
            }}
          >
            All
          </a>
        </li>{' '}
        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filter.filter === 1,
            })}
            onClick={(event) => {
              event.preventDefault();
              dispatchFilterAction(updateFilter(1));
            }}
          >
            Active
          </a>
        </li>{' '}
        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: filter.filter === 2,
            })}
            onClick={(event) => {
              event.preventDefault();
              dispatchFilterAction(updateFilter(2));
            }}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={() => dispatchTodoAction(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  );
}

export default TodoFooter;
