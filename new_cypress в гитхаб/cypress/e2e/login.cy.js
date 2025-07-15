describe('Форма логина: проверка позитивных и негативных кейсов', () => {
  const baseUrl = 'https://login.qa.studio';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('1. Позитивный кейс авторизации', () => {
    cy.get('#mail').type('USER_LOGIN');
    cy.get('#pass').type('USER_PASSWORD');
    cy.get('#loginButton').click();

    cy.contains('Авторизация прошла успешно').should('be.visible');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });

  it('2. Восстановление пароля', () => {
    cy.contains('Забыл пароль?').click();
    cy.get('#mailForgot').type('test@example.com');
    cy.get('#restoreEmailButton').click();

    cy.contains('Успешно отправили код на e-mail').should('be.visible');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });

  it('3. Неверный пароль', () => {
    cy.get('#mail').type('USER_LOGIN');
    cy.get('#pass').type('неправильныйПароль');
    cy.get('#loginButton').click();

    cy.contains('Такого логина или пароля нет').should('be.visible');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });

  it('4. Неверный логин', () => {
    cy.get('#mail').type('wrong@mail.ru');
    cy.get('#pass').type('USER_PASSWORD');
    cy.get('#loginButton').click();

    cy.contains('Такого логина или пароля нет').should('be.visible');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });

  it('5. Валидация: логин без "@"', () => {
    cy.get('#mail').type('invalidEmail.ru');
    cy.get('#pass').type('USER_PASSWORD');
    cy.get('#loginButton').click();

    cy.contains('Нужно исправить проблему валидации').should('be.visible');
  });

  it('6. Баг: логин с заглавными буквами не приводит к нижнему регистру', () => {
    cy.get('#mail').type('USER_LOGIN');
    cy.get('#pass').type('USER_PASSWORD');
    cy.get('#loginButton').click();

    // ❗ Тест должен упасть, т.к. разработчик не реализовал приведение к нижнему регистру
    cy.contains('Авторизация прошла успешно').should('be.visible');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });
});