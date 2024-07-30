import * as Unicons from "@iconscout/react-unicons";

import {
  ArraysMatch,
  GetFormStatusMassage,
  GetGridCategoriesPreferences,
  GetListCategoriesPreferences,
  GridCategoriesPreferences,
  SetInitialPreferences,
} from "./types";

// 1. Set inicial preferences
export const setInicialCategoriesPreferences: SetInitialPreferences = categories => {
  const preferences: string[] = [];

  categories.forEach(category => {
    if (!preferences.includes(category.id)) {
      preferences.push(category.id);
    }
  });

  return preferences;
};

// 2. Get list categories
export const getListCategoriesPreferences: GetListCategoriesPreferences = userCategories => {
  return userCategories.map(userCategory => ({
    id: userCategory.id,
    name: userCategory.name,
    icon: Unicons[userCategory.iconId ? userCategory.iconId : "UilImageBlock"],
  }));
};

// 3. Get grid categories
export const getGridCategoriesPreferences: GetGridCategoriesPreferences = (
  categories,
  userCategories
) => {
  const inicialPreferences: GridCategoriesPreferences[] = [];

  categories.forEach(category => {
    let isSelected = false;
    const defaultPreferences = {
      id: category.id,
      title: category.name,
      icon: Unicons[category.iconId ? category.iconId : "UilImageBlock"],
    };

    for (let i = 0; i < userCategories.length; i++) {
      if (category.id === userCategories[i]) {
        isSelected = true;
        break;
      }
    }

    if (isSelected) {
      inicialPreferences.push({
        ...defaultPreferences,
        value: true,
      });
    } else {
      inicialPreferences.push({
        ...defaultPreferences,
        value: false,
      });
    }
  });

  return inicialPreferences;
};

// 4. Form validation
export const arraysMatch: ArraysMatch = (arr1, arr2) => {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;
  // Check if all items exist
  return arr2.every(item => arr1.includes(item));
};

// 5. Form status messages
export const getFormStatusMessage: GetFormStatusMassage = (tile, error) => {
  if (error) {
    return {
      title: "Error",
      content: `Unable to save ${tile} preferences.`,
    };
  }
  return {
    title: `${tile} saved`,
    content: `${tile} preferences have been successfully saved.`,
  };
};
