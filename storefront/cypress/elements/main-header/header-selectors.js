export const HEADER_SELECTORS = {
  mainMenuButton: "[data-test=testButton]",
  loggedInMainMenuButton: "[data-test=userButton]",
  logOutButton: "[data-test=mobileMenuLogoutLink]",
  mainMenuSearchButton: ".main-menu__search",
  mainMenuSearchInput: "form.search input",
  cartBtn: "[data-test='menuCartOverlayLink']",
  mainMenuDropdown: ".main-menu__dropdown",
  closeSearchToast: ".search__input__close-btn > div",

  MAIN_MENU_DROPDOWN_SELECTORS: {
    orderHistory: "[data-test='desktopMenuOrderHistoryLink']",
    myAccount: ".menu-dropdown > .menu-dropdown__body > .main-menu__dropdown > li:nth-child(1) > a",
  },
};
