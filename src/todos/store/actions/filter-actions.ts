export enum FilterActionKind {
  UPDATE_FILTER = 'UPDATE_FILTER',
}

export const updateFilter = (
  value: number
): {
  type: FilterActionKind.UPDATE_FILTER;
  payload: number;
} => ({
  type: FilterActionKind.UPDATE_FILTER,
  payload: value,
});

export type FilterAction = ReturnType<typeof updateFilter>;
