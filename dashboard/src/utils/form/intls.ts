import { defineMessages } from "react-intl";

const commonErrorMessages = defineMessages({
  invalidPassword: {
    defaultMessage:
      "Must contain 7 characters and at least an uppercase, a lowercase, a number and a special case."
  },
  notSamePasswords: {
    defaultMessage: "Password and repeated pasword must be the same"
  }
});

export default commonErrorMessages;
