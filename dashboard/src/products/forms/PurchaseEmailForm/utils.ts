import { validateVariable } from "@saleor/products/components/ProductEmailVariables/utils";
import { defineMessages, IntlShape } from "react-intl";

import { maybe } from "../../../misc";
import { PurchaseEmailFormData } from "./types";

const messages = defineMessages({
  openCloseBrackets: {
    defaultMessage:
      "All double brackets must be open and closed with no spaces in between."
  },
  onlyBoubleBracketsAllowed: {
    defaultMessage:
      "Only double brackets with no spaces in between are allowed."
  },
  noEmptyVariablesAllowed: {
    defaultMessage: "Empty variables are not alloewd."
  },
  closeBrackets: {
    defaultMessage:
      "All double brackets must be closed with no spaces in between"
  },
  noSubjectVariablesAllowed: {
    defaultMessage:
      "No variables nor curly braces are allowed in the subject field."
  }
});

export function getPurchaseEmailFormData(
  purchaseEmail: Partial<PurchaseEmailFormData>
): PurchaseEmailFormData {
  return {
    subject: maybe(() => purchaseEmail.subject, ""),
    title: maybe(() => purchaseEmail.title, ""),
    content: maybe(() => purchaseEmail.content, "")
  };
}

export const validateHandlebarsTemplate = (
  content: string,
  intl: IntlShape
): string => {
  let isFirstBracketOpen: boolean = false;
  let isSecondBracketOpen: boolean = false;
  let isFirstBracketClose: boolean = false;
  let isSecondBracketClose: boolean = false;

  let variableContent: string = "";
  let errorMessage: string = "";

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < content.length; i++) {
    const character = content[i];
    const beforeCharacter = content[i - 1];

    if (!isFirstBracketOpen && character === "}") {
      errorMessage = intl.formatMessage(messages.openCloseBrackets);
      break;
    }
    if (!isFirstBracketOpen && !isSecondBracketOpen && character === "{") {
      isSecondBracketClose = false;
      isFirstBracketOpen = true;
      continue;
    }
    if (isFirstBracketOpen && !isSecondBracketOpen && character !== "{") {
      errorMessage = intl.formatMessage(messages.onlyBoubleBracketsAllowed);
      break;
    }
    if (
      isFirstBracketOpen &&
      !isSecondBracketOpen &&
      beforeCharacter === "{" &&
      character === "{"
    ) {
      isSecondBracketOpen = true;
      continue;
    }

    if (isFirstBracketOpen && isSecondBracketOpen && character === "{") {
      errorMessage = intl.formatMessage(messages.onlyBoubleBracketsAllowed);
      break;
    }
    if (
      isFirstBracketOpen &&
      isSecondBracketOpen &&
      character !== "{" &&
      character !== "}"
    ) {
      variableContent = variableContent + character;
    }
    if (isFirstBracketOpen && isSecondBracketOpen && character === "}") {
      if (!variableContent.trim()) {
        errorMessage = intl.formatMessage(messages.noEmptyVariablesAllowed);
        break;
      }

      const variableErrorMessage = validateVariable(variableContent, intl);
      if (variableErrorMessage) {
        errorMessage = variableErrorMessage;
        break;
      }

      isFirstBracketClose = true;
    }
    if (isFirstBracketClose && !isSecondBracketClose && character !== "}") {
      errorMessage = intl.formatMessage(messages.closeBrackets);
      break;
    }
    if (
      isFirstBracketClose &&
      !isSecondBracketClose &&
      beforeCharacter === "}" &&
      character === "}"
    ) {
      isSecondBracketClose = true;
      continue;
    }
    if (isFirstBracketClose && isSecondBracketClose && character === "}") {
      errorMessage = intl.formatMessage(messages.closeBrackets);
      break;
    }
    if (
      isFirstBracketClose &&
      isSecondBracketClose &&
      beforeCharacter === "}" &&
      character !== "}"
    ) {
      // Reset status
      isFirstBracketOpen = false;
      isSecondBracketOpen = false;
      isFirstBracketClose = false;
      isSecondBracketClose = false;

      variableContent = "";
    }
  }

  if (
    !errorMessage &&
    ((isFirstBracketOpen && !isFirstBracketClose) ||
      (isSecondBracketOpen && !isSecondBracketClose))
  ) {
    errorMessage = intl.formatMessage(messages.openCloseBrackets);
  }

  return errorMessage;
};

export const validateSuject = (content: string, intl: IntlShape): string => {
  let errorMessage: string = "";

  for (const character of content) {
    if (character === "{" || character === "}") {
      errorMessage = intl.formatMessage(messages.noSubjectVariablesAllowed);
    }
  }

  return errorMessage;
};
