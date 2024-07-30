import faker from "faker";

import { HEADER_SELECTORS } from "../../elements/main-header/header-selectors";
import { LOGIN_SELECTORS } from "../../elements/saleor-account/login-selectors";

describe("User login, logout and registration", () => {
  beforeEach(() => {
    cy.server();
    cy.route("POST", `${Cypress.env("API_URI")}`).as("graphqlQuery");
    cy.visit("/");
  });

  it("should open overlay with a sign in and register form", () => {
    cy.get(HEADER_SELECTORS.mainMenuButton)
      .click()
      .get(".overlay")
      .should("exist");
  });

  describe("Register new account", () => {
    it("the user will register but this must be confirmed by email", () => {
      const randomWord = faker.random.words(1).replace(" ", "-").replace(/[{()}]/g, '');
      const fakeEmailAdressText = `${randomWord}@example.com`;
      const fakePasswordText = faker.internet.password();

      cy.get(HEADER_SELECTORS.mainMenuButton)
        .click()
        .get(LOGIN_SELECTORS.registerNewAccount)
        .click()
        .get(LOGIN_SELECTORS.emailAddressInput)
        .type(fakeEmailAdressText)
        .get(LOGIN_SELECTORS.nameInput)
        .type(randomWord)
        .get(LOGIN_SELECTORS.lastNameInput)
        .type(randomWord)
        .get(LOGIN_SELECTORS.emailPasswordInput)
        .type(fakePasswordText)
        .get(LOGIN_SELECTORS.registerButton)
        .click()
    });

    it("should display an error if user introduce an bad and enpty credentials", () => {
      const randomWord = faker.random.words(1).replace(" ", "-").replace(/[{()}]/g, '');
      const badEmail = `${randomWord}.com`;
      const badName = '';

      cy.get(HEADER_SELECTORS.mainMenuButton)
          .click()
          .get(LOGIN_SELECTORS.registerNewAccount)
          .click()
          .get(LOGIN_SELECTORS.emailAddressInput)
          .type(badEmail)
          .get(LOGIN_SELECTORS.nameInput)
          .focus()
          .blur()
          .get(LOGIN_SELECTORS.warningCredentialMessage)
          .should("contain", "Completa este campo")
          .get(LOGIN_SELECTORS.lastNameInput)
          .focus()
          .blur()
          .get(LOGIN_SELECTORS.warningCredentialMessage)
          .should("contain", "Completa este campo")
          .get(LOGIN_SELECTORS.emailPasswordInput)
          .focus()
          .blur()
          .get(LOGIN_SELECTORS.warningCredentialMessage)
          .should("contain","Completa este campo")
          .get(LOGIN_SELECTORS.registerButton)
          .click()
        .get(LOGIN_SELECTORS.warningCredentialMessage)
        .should('be.visible');
    });
  });
  
  describe("Login", () => {
    it("should successfully log in an user", () => {
      cy.loginUserViaForm()
        .get(LOGIN_SELECTORS.alertPopupMessage, { timeout: 2000 })
        .should("contain", "You are now logged in");
    });

    it("should display an error if user does not exist", () => {
      cy.get(HEADER_SELECTORS.mainMenuButton)
        .click()
        .get(LOGIN_SELECTORS.emailAddressInput)
        .type("thisUserIsNotRegistered@example.com")
        .get(LOGIN_SELECTORS.emailPasswordInput)
        .type("thisisnotavalidpassword")
        .get(LOGIN_SELECTORS.signInButton)
        .click()
        .get(LOGIN_SELECTORS.warningCredentialMessage)
        .should("contain", "Please, enter valid credentials");
    });
  });

  describe("Logout", () => {
    it("should successfully log out an user", () => {
      cy.loginUserViaForm()
        .logoutUser()
        .get(LOGIN_SELECTORS.alertPopupMessage)
        .should("contain", "You are now logged out");
    });
  });
});
