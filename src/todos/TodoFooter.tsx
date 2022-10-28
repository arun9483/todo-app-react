import React, { useContext } from 'react';
import classNames from 'classnames';

import { TodoAppContext } from './Todos';
import { getActiveCount } from './util';
import { FilterActionKind, TodoActionKind } from './todoTypes';

import './TodoFooter.css';

function TodoFooter() {
  const { list, filter, dispatchFilterAction, dispatchListAction } =
    useContext(TodoAppContext);

  const count = getActiveCount(list);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> {count > 1 ? 'items' : 'item'} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({ selected: filter === 0 })}
            onClick={(event) => {
              event.preventDefault();
              dispatchFilterAction({
                type: FilterActionKind.UPDATE_FILTER,
                payload: 0,
              });
            }}
          >
            All
          </a>
        </li>{' '}
        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filter === 1,
            })}
            onClick={(event) => {
              event.preventDefault();
              dispatchFilterAction({
                type: FilterActionKind.UPDATE_FILTER,
                payload: 1,
              });
            }}
          >
            Active
          </a>
        </li>{' '}
        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: filter === 2,
            })}
            onClick={(event) => {
              event.preventDefault();
              dispatchFilterAction({
                type: FilterActionKind.UPDATE_FILTER,
                payload: 2,
              });
            }}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={() =>
          dispatchListAction({
            type: TodoActionKind.CLEAR_COMPLETED,
            payload: list[0],
          })
        }
      >
        Clear completed
      </button>
    </footer>
  );
}

export default TodoFooter;
