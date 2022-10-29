export enum EditingActionKind {
  UPDATE_EDITING_INFO = 'UPDATE_EDITING_INFO',
}

export const updateEditing = (
  value: string
): {
  type: EditingActionKind.UPDATE_EDITING_INFO;
  payload: string;
} => ({
  type: EditingActionKind.UPDATE_EDITING_INFO,
  payload: value,
});

export type EditingAction = ReturnType<typeof updateEditing>;
