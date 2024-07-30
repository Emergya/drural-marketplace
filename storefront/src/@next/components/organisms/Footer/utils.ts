export const getFooterColumns = (colsNum: number) => {
  switch (colsNum) {
    case 1:
      return "100%";
    case 2:
      return "50%";
    case 3:
      return "33%";
    case 5:
      return "20%";
    default:
      return "25%";
  }
};
