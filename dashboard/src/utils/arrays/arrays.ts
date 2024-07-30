import difference from "lodash/difference";
import intersection from "lodash/intersection";

export const arrayDiff = (before: string[], after: string[]) => ({
  added: difference(after, before),
  removed: difference(before, after),
  common: intersection(before, after)
});

export const arraySimpleToggle = (array: string[], item: string) => {
  if (array.some(arrItem => arrItem === item)) {
    return array.filter(arrItem => arrItem !== item);
  } else {
    return [...array, item];
  }
};

export const hasArr1AnyItemsOfArr2 = <T>(arr1: T[], arr2: T[]): boolean =>
  arr1.some(item => arr2.includes(item));

export const hasArr2AllItemsFromArr1 = <T>(arr1: T[], arr2: T[]): boolean =>
  arr1.every(item => arr2.includes(item));

export const sortArray = <T>(array: T[], sortArray: T[]): T[] =>
  array.sort((a, b) => sortArray.indexOf(a) - sortArray.indexOf(b));
