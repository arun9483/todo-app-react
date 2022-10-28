export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoListProps {
  todos: ITodo[];
}

export interface TodoProps {
  todo: ITodo;
}

export interface TodoFooterProps {
  filter: number;
  count: number;
  updateFilter: (type: number) => void;
  clearCompleted: () => void;
}

export interface TodoState {
  list: ITodo[];
}

export enum TodoActionKind {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  TOGGLE_STATUS = 'TOGGLE_STATUS',
  TOGGLE_ALL = 'TOGGLE_ALL',
  CLEAR_COMPLETED = 'CLEAR_COMPLETED',
}

export interface TodoAction {
  type: TodoActionKind;
  payload: ITodo;
}

export interface FilterState {
  filter: number;
}

export enum FilterActionKind {
  UPDATE_FILTER = 'UPDATE_FILTER',
}

export interface FilterAction {
  type: FilterActionKind;
  payload: number;
}

export interface EditingState {
  editing: string;
}

export enum EditingActionKind {
  UPDATE_EDITING_INFO = 'UPDATE_EDITING_INFO',
}

export interface EditingAction {
  type: EditingActionKind;
  payload: string;
}

export interface TodoAppContextType {
  list: ITodo[];
  filter: number;
  editing: string;
  dispatchListAction: (action: TodoAction) => void;
  dispatchFilterAction: (action: FilterAction) => void;
  dispatchEditingAction: (action: EditingAction) => void;
}
