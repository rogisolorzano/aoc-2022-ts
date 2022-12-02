export const isDefined = <T>(v: T | undefined | null): v is T => typeof v !== 'undefined' && v !== null;

export const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const invert = <K extends keyof any, V extends keyof any>(map: Record<K, V>): Record<V, K> =>
  Object.entries(map).reduce((inverted, [k, v]) => {
    inverted[v as V] = k as K;
    return inverted;
  }, {} as Record<V, K>);
