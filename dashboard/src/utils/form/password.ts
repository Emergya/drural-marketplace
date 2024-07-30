export const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\-_])(?=.{7,})/;

export const validatePassword = (password: string): boolean =>
  passwordRegex.test(password);

export const getIsSamePassword = (
  passwordOne: string,
  passwordTwo: string
): boolean => passwordOne === passwordTwo;
