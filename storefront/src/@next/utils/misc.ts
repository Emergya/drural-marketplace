import { UknownObject } from "./tsUtils";

export function maybe<T>(exp: () => T): T | undefined;
export function maybe<T>(exp: () => T, d: T): T;
export function maybe(exp: any, d?: any) {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
}

export function filterNotEmptyArrayItems<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export function pick(obj: UknownObject, keys: string[]): UknownObject {
  return { ...keys.reduce((res, key) => ({ ...res, [key]: obj[key] }), {}) };
}

export function chunk(array: any[], size = 1) {
  const arrayChunks = [];
  for (let i = 0; i < array.length; i += size) {
    const arrayChunk = array.slice(i, i + size);
    arrayChunks.push(arrayChunk);
  }
  return arrayChunks;
}

interface Edge<T> {
  node: T;
}
interface Connection<T> {
  edges: Array<Edge<T>> | undefined;
}

export function mapEdgesToItems<T>(
  data: Connection<T> | undefined
): T[] | undefined {
  return data?.edges?.map(({ node }) => node);
}
