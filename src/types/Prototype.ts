
interface Array<T> {
  binarySearch(cb: (value: T) => [currentValue: number, targetValue: number]): T | undefined;
}
