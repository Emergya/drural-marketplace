import React from "react";

export const checkAll = (state: BusinessState, methodType: string) => {
  const states = state[methodType];
  let selectState = 0;
  for (const methodState in states) {
    if (states[methodState]) {
      selectState++;
    }
  }
  if (selectState === Object.keys(states).length) {
    return true;
  } else {
    return false;
  }
};

export const mapMethodState = (
  state: BusinessState,
  index: number,
  methodType: string
) => {
  const keys = Object.keys(state[methodType]);
  return state[methodType][keys[index]];
};

export interface CreateCompanyStep {
  disabled: boolean;
  dispatch: React.Dispatch<Action>;
  state: BusinessState;
  errors: InputErrors;
  handdleInput: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  image?: string;
  banner?: string;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
  setBanner?: React.Dispatch<React.SetStateAction<string>>;
  setMapboxAddressSelected?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}

function instanceOfCoordinates(object: any): object is Coordinates {
  if (!object) {
    return false;
  }
  return "longitude" in object && "latitude" in object;
}

interface Payments {
  creditCard: boolean;
  payPal: boolean;
  moneyTransfer: boolean;
  cashOnDelivery: boolean;
  payWithYourPhone: boolean;
  payUponPickUp: boolean;
}

interface Shipping {
  correos: boolean;
  correosExpress: boolean;
  courier: boolean;
  courierExpress: boolean;
  pickUpAtTheStore: boolean;
}

interface BusinessInfo {
  companyName: string;
  cif: string;
  phone: string;
  email: string;
  address: string;
  streetSecondLine: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
}

interface BusinessDescription {
  imageShop: File;
  banner: File;
  shopName: string;
  description: string;
}

export interface Action {
  type: ActionKind;
  payload: string | boolean | File | Coordinates;
}

export interface BusinessState {
  addressAutoCompleted: string;
  businessInfo: BusinessInfo;
  businessDescription: BusinessDescription;
  paymentMethods: Payments;
  shippingMethods: Shipping;
}

export interface InputErrors {
  companyName: string;
  cif: string;
  phone: string;
  email: string;
  address: string;
  streetSecondLine: string;
  postalCode: string;
  city: string;
  province: string;
  shopName: string;
  description: string;
}

export enum ActionKind {
  companyName = "COMPANY_NAME",
  cif = "CIF",
  phone = "PHONE",
  email = "EMAIL",
  address = "ADRESS",
  streetSecondLine = "STREET_SECONDLINE",
  postalCode = "POSTALCODE",
  city = "CITY",
  province = "PROVINCE",
  country = "COUNTRY",
  coordinates = "COORDINATES",
  imageShop = "IMAGE_SHOP",
  banner = "BANNER",
  shopName = "SHOP_NAME",
  description = "DESCRIPTION",
  creditCard = "CREDIT_CARD",
  payPal = "PAYPAL",
  moneyTransfer = "MONEY_TRANSFER",
  cashOnDelivery = "CASH_ON_DELIVERY",
  payWithYourPhone = "PAY_WITH_YOUR_PHONE",
  payUponPickUp = "PAY_UPON_PICK_UP",
  correos = "CORREOS",
  correosExpress = "CORREOS_EXPRESS",
  courier = "COURIER",
  courierExpress = "COURIER_EXPRESS",
  pickUpAtTheStore = "PICK_UP_AT_THE_STORE",
  addressAutoCompleted = "ADRESS_AUTO_COMPLETED"
}

export const addressAutoCompletedAction = (
  name: string,
  value: string
): Action => {
  switch (name) {
    case "addressAutoCompleted":
      return { type: ActionKind.addressAutoCompleted, payload: value };
  }
};

export const businessInfoAction = (
  name: string,
  value: string | Coordinates
): Action => {
  switch (name) {
    case "companyName":
      return { type: ActionKind.companyName, payload: value };
    case "cif":
      return { type: ActionKind.cif, payload: value };
    case "phone":
      return { type: ActionKind.phone, payload: value };
    case "email":
      return { type: ActionKind.email, payload: value };
    case "address":
      return { type: ActionKind.address, payload: value };
    case "streetSecondLine":
      return { type: ActionKind.streetSecondLine, payload: value };
    case "postalCode":
      return { type: ActionKind.postalCode, payload: value };
    case "city":
      return { type: ActionKind.city, payload: value };
    case "province":
      return { type: ActionKind.province, payload: value };
    case "country":
      return { type: ActionKind.country, payload: value };
    case "coordinates":
      return { type: ActionKind.coordinates, payload: value };
  }
};

export const businessDescriptionAction = (
  name: string,
  value: string | File
): Action => {
  switch (name) {
    case "imageShop":
      return { type: ActionKind.imageShop, payload: value };
    case "banner":
      return { type: ActionKind.banner, payload: value };
    case "shopName":
      return { type: ActionKind.shopName, payload: value };
    case "description":
      return { type: ActionKind.description, payload: value };
  }
};

export const paymentAction = (method: string, checked: boolean): Action => {
  switch (method) {
    case "Credit card":
      return { type: ActionKind.creditCard, payload: checked };
    case "Paypal":
      return { type: ActionKind.payPal, payload: checked };
    case "Money transfer":
      return { type: ActionKind.moneyTransfer, payload: checked };
    case "Cash on delivery":
      return { type: ActionKind.cashOnDelivery, payload: checked };
    case "Pay with your phone":
      return { type: ActionKind.payWithYourPhone, payload: checked };
    case "Pay upon pick up":
      return { type: ActionKind.payUponPickUp, payload: checked };
  }
};

export const shippingAction = (method: string, checked: boolean): Action => {
  switch (method) {
    case "Correos":
      return { type: ActionKind.correos, payload: checked };
    case "Correos Express":
      return { type: ActionKind.correosExpress, payload: checked };
    case "Courier":
      return { type: ActionKind.courier, payload: checked };
    case "Courier express delivery":
      return { type: ActionKind.courierExpress, payload: checked };
    case "Pick up at the store":
      return { type: ActionKind.pickUpAtTheStore, payload: checked };
  }
};

export const businessReducer = (
  state: BusinessState,
  action: Action
): BusinessState => {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.addressAutoCompleted:
      if (typeof payload === "string") {
        return {
          ...state,
          addressAutoCompleted: payload
        };
      }
    case ActionKind.companyName:
      if (typeof payload === "string") {
        return {
          ...state,
          businessInfo: { ...state.businessInfo, companyName: payload }
        };
      }
    case ActionKind.cif:
      if (typeof payload === "string") {
        return {
          ...state,
          businessInfo: { ...state.businessInfo, cif: payload }
        };
      }
    case ActionKind.phone:
      if (typeof payload === "string") {
        return {
          ...state,
          businessInfo: { ...state.businessInfo, phone: payload }
        };
      }
    case ActionKind.email:
      if (typeof payload === "string") {
        return {
          ...state,
          businessInfo: { ...state.businessInfo, email: payload }
        };
      }
    case ActionKind.address:
      if (typeof payload === "string") {
        return {
          ...state,
          businessInfo: { ...state.businessInfo, address: payload }
        };
      }
    case ActionKind.streetSecondLine:
      if (typeof payload === "string") {
        return {
          ...state,
          businessInfo: { ...state.businessInfo, streetSecondLine: payload }
        };
      }
    case ActionKind.postalCode:
      if (typeof payload === "string") {
        return {
          ...state,
          businessInfo: { ...state.businessInfo, postalCode: payload }
        };
      }
    case ActionKind.city:
      if (typeof payload === "string") {
        return {
          ...state,
          businessInfo: { ...state.businessInfo, city: payload }
        };
      }
    case ActionKind.province:
      if (typeof payload === "string") {
        return {
          ...state,
          businessInfo: { ...state.businessInfo, province: payload }
        };
      }
    case ActionKind.country:
      if (typeof payload === "string") {
        return {
          ...state,
          businessInfo: { ...state.businessInfo, country: payload }
        };
      }
    case ActionKind.coordinates:
      if (instanceOfCoordinates(payload)) {
        return {
          ...state,
          businessInfo: {
            ...state.businessInfo,
            latitude: payload.latitude,
            longitude: payload.longitude
          }
        };
      }

    case ActionKind.imageShop:
      if (
        typeof payload !== "string" &&
        typeof payload !== "boolean" &&
        !instanceOfCoordinates(payload)
      ) {
        return {
          ...state,
          businessDescription: {
            ...state.businessDescription,
            imageShop: payload
          }
        };
      }
    case ActionKind.banner:
      if (
        typeof payload !== "string" &&
        typeof payload !== "boolean" &&
        !instanceOfCoordinates(payload)
      ) {
        return {
          ...state,
          businessDescription: {
            ...state.businessDescription,
            banner: payload
          }
        };
      }
    case ActionKind.shopName:
      if (typeof payload === "string") {
        return {
          ...state,
          businessDescription: {
            ...state.businessDescription,
            shopName: payload
          }
        };
      }

    case ActionKind.description:
      if (typeof payload === "string") {
        return {
          ...state,
          businessDescription: {
            ...state.businessDescription,
            description: payload
          }
        };
      }
    case ActionKind.creditCard:
      if (typeof payload === "boolean") {
        return {
          ...state,
          paymentMethods: {
            ...state.paymentMethods,
            creditCard: payload
          }
        };
      }
    case ActionKind.payPal:
      if (typeof payload === "boolean") {
        return {
          ...state,
          paymentMethods: {
            ...state.paymentMethods,
            payPal: payload
          }
        };
      }
    case ActionKind.moneyTransfer:
      if (typeof payload === "boolean") {
        return {
          ...state,
          paymentMethods: {
            ...state.paymentMethods,
            moneyTransfer: payload
          }
        };
      }
    case ActionKind.cashOnDelivery:
      if (typeof payload === "boolean") {
        return {
          ...state,
          paymentMethods: {
            ...state.paymentMethods,
            cashOnDelivery: payload
          }
        };
      }
    case ActionKind.payWithYourPhone:
      if (typeof payload === "boolean") {
        return {
          ...state,
          paymentMethods: {
            ...state.paymentMethods,
            payWithYourPhone: payload
          }
        };
      }
    case ActionKind.payUponPickUp:
      if (typeof payload === "boolean") {
        return {
          ...state,
          paymentMethods: {
            ...state.paymentMethods,
            payUponPickUp: payload
          }
        };
      }
    case ActionKind.correos:
      if (typeof payload === "boolean") {
        return {
          ...state,
          shippingMethods: {
            ...state.shippingMethods,
            correos: payload
          }
        };
      }
    case ActionKind.correosExpress:
      if (typeof payload === "boolean") {
        return {
          ...state,
          shippingMethods: {
            ...state.shippingMethods,
            correosExpress: payload
          }
        };
      }
    case ActionKind.courier:
      if (typeof payload === "boolean") {
        return {
          ...state,
          shippingMethods: {
            ...state.shippingMethods,
            courier: payload
          }
        };
      }
    case ActionKind.courierExpress:
      if (typeof payload === "boolean") {
        return {
          ...state,
          shippingMethods: {
            ...state.shippingMethods,
            courierExpress: payload
          }
        };
      }
    case ActionKind.pickUpAtTheStore:
      if (typeof payload === "boolean") {
        return {
          ...state,
          shippingMethods: {
            ...state.shippingMethods,
            pickUpAtTheStore: payload
          }
        };
      }
    default:
      return state;
  }
};
