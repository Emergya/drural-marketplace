import { ICheckoutModelLine } from "../../helpers/LocalStorageHandler";
import { RemoveCheckoutJobInput } from "./types";

export const getRemoveCheckoutJotInput = (
  checkoutId: string,
  keepLines: boolean,
  checkoutLines: ICheckoutModelLine[] | null | undefined
): RemoveCheckoutJobInput => {
  const input: RemoveCheckoutJobInput = { checkoutId };

  if (keepLines && checkoutLines) {
    input.lines = checkoutLines;
  }

  return input;
};
