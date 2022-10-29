import { EditingState } from '../initial-states';
import { EditingAction, EditingActionKind } from '../actions/editing-actions';

export const editingReducer = (state: EditingState, action: EditingAction) => {
  if (action.type === EditingActionKind.UPDATE_EDITING_INFO) {
    return {
      ...state,
      editing: action.payload,
    };
  } else {
    return state;
  }
};
