import { FilterState } from '../initial-states';
import { FilterAction, FilterActionKind } from '../actions/filter-actions';

export const filterReducer = (state: FilterState, action: FilterAction) => {
  if (action.type === FilterActionKind.UPDATE_FILTER) {
    return {
      ...state,
      filter: action.payload,
    };
  } else {
    return state;
  }
};
