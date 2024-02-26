export const generateId = (array: { id: number }[]): number => {
  if (array.length === 0) {
    return 1;
  }
  return array[array.length - 1].id + 1;
}