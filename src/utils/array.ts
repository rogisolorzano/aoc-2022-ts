export const sort = (values: number[]) => values.sort((a, b) => a - b);
export const sortBy = <T>(values: T[], by: (v: T) => number) => values.sort((a, b) => by(a) - by(b));
export const isArray = (values: unknown): values is unknown[] => Array.isArray(values);

export const lastIndex = <T>(arr: T[]): number => arr.length - 1;
export const lastItem = <T>(arr: T[]): T => arr[lastIndex(arr)];
export const last = <T>(arr: T[], n: number) => arr.slice(-n);

export const parseNumbers = <T>(arr: T[]): number[] => arr.map(n => Number(n));

export const whileNotEmpty = <T>(arr: T[], action: () => void) => {
  while (arr.length > 0) {
    action();
  }
};

export const from = <T = undefined>(size: number, creator?: (v: T, k: number) => T): T[] =>
  Array.from({ length: size }, creator || (() => undefined as unknown as T));

export const zip = <T>(arrOne: T[], arrTwo: T[]): [T | undefined, T | undefined][] => {
  const maxLength = Math.max(arrOne.length, arrTwo.length);

  return from(maxLength).map((_, i) => [arrOne[i], arrTwo[i]]);
};

/**
 * Split arrays based on a predicate.
 *
 * @param arr The array to split.
 * @param predicate Receives the current item and returns true if the split should happen at that item.
 */
export const splitOn = <T>(arr: T[], predicate: (v: T, i: number) => boolean): T[][] =>
  arr
    .reduce(
      (chunks, item, i) => {
        if (predicate(item, i)) {
          chunks.push([]);
        } else {
          lastItem(chunks).push(item);
        }

        return chunks;
      },
      [[]] as T[][],
    )
    .filter(a => a.length > 0);

/**
 * Chunks an array into arrays of n size.
 */
export const chunk = <T>(arr: T[], size: number) =>
  arr.reduce((chunks, item) => {
    const currentChunk = lastItem(chunks);

    if (currentChunk?.length < size) {
      currentChunk.push(item);
    } else {
      chunks.push([item]);
    }
    return chunks;
  }, [] as T[][]);

/**
 * Creates a rolling window of arrays based on a size.
 *
 * @param arr The array to create the window for.
 * @param size The window sizes.
 * @returns The windowed array.
 */
export const window = <T>(arr: T[], size: number): T[][] => {
  if (size <= 0 || arr.length < size) return [];

  const result = [];

  for (let i = 0; i < arr.length - size + 1; i++) {
    result.push(arr.slice(i, size + i));
  }

  return result;
};
