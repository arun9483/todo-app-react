import React, { useReducer, createContext } from 'react';

import TodosApp from './TodoApp';

import {
  ITodo,
  TodoState,
  TodoAction,
  FilterState,
  FilterAction,
  FilterActionKind,
  EditingState,
  EditingAction,
  EditingActionKind,
  TodoAppContextType,
  TodoActionKind,
} from './todoTypes';

export const TodoAppContext = createContext<TodoAppContextType>({
  list: [],
  filter: 0,
  editing: '',
  dispatchListAction: (action: TodoAction) => {},
  dispatchFilterAction: (action: FilterAction) => {},
  dispatchEditingAction: (action: EditingAction) => {},
});

const todoInitialState: TodoState = {
  list: [
    {
      id: 'a1',
      title: 'a-one',
      completed: true,
    },
    {
      id: 'a2',
      title: 'a-two',
      completed: false,
    },
    {
      id: 'a3',
      title: 'a-three',
      completed: false,
    },
    {
      id: 'a4',
      title: 'a-four',
      completed: true,
    },
  ],
};

const todoReducer = (state: TodoState, action: TodoAction) => {
  let payload = action.payload;
  let list = state.list;
  let newList = [];
  switch (action.type) {
    case TodoActionKind.ADD:
      newList = [...list, action.payload];
      return { list: newList };
    case TodoActionKind.EDIT:
      newList = list.map((item: ITodo) => {
        if (item.id === payload.id) {
          return { ...item, title: payload.title };
        }
        return item;
      });
      return { list: newList };
    case TodoActionKind.DELETE:
      newList = list.filter((item: ITodo) => {
        return item.id !== payload.id;
      });
      return { list: newList };
    case TodoActionKind.TOGGLE_STATUS:
      payload = action.payload;
      newList = list.map((item: ITodo) => {
        if (item.id === payload.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      return { list: newList };
    case TodoActionKind.TOGGLE_ALL:
      let idx = list.findIndex((todo) => !todo.completed);
      newList = list.map((item: ITodo) => {
        return { ...item, completed: idx > -1 };
      });
      return { list: newList };
    case TodoActionKind.CLEAR_COMPLETED:
      newList = list.filter((item: ITodo) => {
        return !item.completed;
      });
      return { list: newList };
    default:
      return state;
  }
};

const filterInitialState: FilterState = { filter: 0 };
const filterReducer = (state: FilterState, action: FilterAction) => {
  if (action.type === FilterActionKind.UPDATE_FILTER) {
    return {
      ...state,
      filter: action.payload,
    };
  } else {
    return state;
  }
};

const editingInitialState: EditingState = { editing: '' };
const editingReducer = (state: EditingState, action: EditingAction) => {
  if (action.type === EditingActionKind.UPDATE_EDITING_INFO) {
    return {
      ...state,
      editing: action.payload,
    };
  } else {
    return state;
  }
};

export default function Todos() {
  const [listState, dispatchListAction] = useReducer(
    todoReducer,
    todoInitialState
  );
  const [filterState, dispatchFilterAction] = useReducer(
    filterReducer,
    filterInitialState
  );
  const [editingState, dispatchEditingAction] = useReducer(
    editingReducer,
    editingInitialState
  );

  return (
    <TodoAppContext.Provider
      value={{
        list: listState.list,
        filter: filterState.filter,
        editing: editingState.editing,
        dispatchListAction,
        dispatchFilterAction,
        dispatchEditingAction,
      }}
    >
      <TodosApp />
    </TodoAppContext.Provider>
  );
}
