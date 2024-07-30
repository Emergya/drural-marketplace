import { BookableResourceStateEnum } from "./forms/types";

export const getIsActiveData = (state: string) =>
  state === BookableResourceStateEnum.ACTIVE ? true : false;
