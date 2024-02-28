export const generateId = (array: { id: number }[]): number => {
  if (array.length === 0) {
    return 1;
  }
  return array[array.length - 1].id + 1;
}

export const binarySearch = (arr: { id: number }[], targetId: number): number => {
  let [left, right] = [0, arr.length - 1];

  let mid = Math.ceil((left + right) / 2)
  if (arr[mid].id === targetId) return mid

  while (left < right) {
    mid = Math.ceil((left + right) / 2)

    if (arr[mid].id === targetId) return mid
    if (arr[mid].id > targetId) right = mid;
    else left = mid;
  }
  return -1;
}

Array.prototype.binarySearch = function <T>(cb: (value: T) => [currentValue: number, targetValue: number]): T | undefined {
  let [left, right] = [0, this.length - 1];

  while (left <= right) {
    let mid = Math.ceil((left + right) / 2)
    let [currentValue, targetValue] = cb(this[mid])

    if (currentValue === targetValue) return this[mid]
    if (currentValue > targetValue) right = mid - 1;
    else left = mid + 1;
  }
  return undefined;
};
