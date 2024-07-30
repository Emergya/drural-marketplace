import { GetActiveMethods } from "./types";

export const getActiveMethods: GetActiveMethods = methods =>
  methods.filter(method => method.isActive);
