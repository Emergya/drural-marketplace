import {
  UilBabyCarriage,
  UilBooks,
  UilBug,
  UilCoffee,
  UilFlower,
  UilLamp,
  UilLaptop,
  UilMedkit,
  UilSubway,
  UilTableTennis,
  UilTvRetro,
  UilWatch,
} from "@iconscout/react-unicons";
import React from "react";

import { PreferenceObject } from "@temp/components/OverlayManager/Preferences/utils";

import { CheckboxIconGrid } from "./CheckboxIconGrid";

const preferencesUnchecked: Record<string, PreferenceObject> = {
  artBooks: { icon: UilBabyCarriage, title: "Art & books", value: false },
  bodyChildren: { icon: UilBooks, title: "Baby & children", value: false },
  beauty: { icon: UilFlower, title: "Beauty", value: false },
  electronics: { icon: UilLaptop, title: "Electronics", value: false },
  fashion: { icon: UilWatch, title: "Fashion", value: false },
  foodBeverages: { icon: UilCoffee, title: "Food and beverages", value: false },
  health: { icon: UilMedkit, title: "Health", value: false },
  homeAppliances: { icon: UilTvRetro, title: "Home appliances", value: false },
  homeGarden: { icon: UilLamp, title: "Home & Garden", value: false },
  pets: { icon: UilBug, title: "Pets", value: false },
  sports: { icon: UilTableTennis, title: "Sports", value: false },
  transportation: { icon: UilSubway, title: "Transportation", value: false },
};

const preferencesChecked: Record<string, PreferenceObject> = {
  artBooks: { icon: UilBabyCarriage, title: "Art & books", value: true },
  bodyChildren: { icon: UilBooks, title: "Baby & children", value: true },
  beauty: { icon: UilFlower, title: "Beauty", value: true },
  electronics: { icon: UilLaptop, title: "Electronics", value: true },
  fashion: { icon: UilWatch, title: "Fashion", value: true },
  foodBeverages: { icon: UilCoffee, title: "Food and beverages", value: true },
  health: { icon: UilMedkit, title: "Health", value: true },
  homeAppliances: { icon: UilTvRetro, title: "Home appliances", value: true },
  homeGarden: { icon: UilLamp, title: "Home & Garden", value: true },
  pets: { icon: UilBug, title: "Pets", value: true },
  sports: { icon: UilTableTennis, title: "Sports", value: true },
  transportation: { icon: UilSubway, title: "Transportation", value: true },
};

export default {
  title: "@components/organisms/CheckboxIconGrid",
  component: CheckboxIconGrid,
};

export const unchecked = () => (
  <CheckboxIconGrid preferences={preferencesUnchecked} />
);

export const checked = () => (
  <CheckboxIconGrid preferences={preferencesChecked} />
);
