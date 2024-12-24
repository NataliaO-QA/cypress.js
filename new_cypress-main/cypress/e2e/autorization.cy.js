import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
         cy.visit('/'); // зашли на сайт
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверка цвета кнопки восстанволения пароля
     })
    afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible') // есть крестик и он виден пользователю
     })

    it('Верный пароль и верный логин', function () {
         
         cy.get(main_page.email).type(data.login); // ввели верный логин
         cy.get(main_page.password).type(data.password); // ввели верный пароль
         cy.get(main_page.login_button).click(); // нажали кнопку "Войти"

         cy.wait(5000);

         cy.get(result_page.title).contains('Авторизация прошла успешно') // верный текст после авторизации
         cy.get(result_page.title).should('be.visible') // текст виден пользователю
     
     })

    it('Восстановление пароля', function () {
        
         cy.get(main_page.fogot_pass_btn).click(); // нажали кнопку "Восстановить пароль"

         cy.get(recovery_page.email).type(data.login); // ввели почту для восстановления пароля    
         cy.get(recovery_page.send_button).click(); // нажали кнопку "Отправить код"

         cy.get(result_page.title).contains('Успешно отправили пароль на e-mail') // верный текст сообщения
         cy.get(result_page.title).should('be.visible') // текст виден пользователю
        
     })

    it('Верный логин и неверный пароль', function () {
        
         cy.get(main_page.email).type(data.login); // ввели верный логин
         cy.get(main_page.password).type('none'); // ввели неверный пароль
         cy.get(main_page.login_button).click(); // нажали кнопку "Войти"

         cy.get(result_page.title).contains('Такого логина или пароля нет') // верный текст об ошибке авторизации
         cy.get(result_page.title).should('be.visible') // текст виден пользователю
         
     })

    it('Неверный логин и верный пароль', function () {
       
         cy.get(main_page.email).type('erman@dolnikov.ru'); // ввели неверный логин
         cy.get(main_page.password).type(data.password); // ввели верный пароль
         cy.get(main_page.login_button).click(); // нажали кнопку "Войти"

         cy.get(result_page.title).contains('Такого логина или пароля нет') // верный текст об ошибке авторизации
         cy.get(result_page.title).should('be.visible') // текст виден пользователю
         
     })

    it('Логин без @ и верный пароль', function () {
         
         cy.get(main_page.email).type('germandolnikov.ru'); // ввели неверный логин без @
         cy.get(main_page.password).type(data.password); // ввели верный пароль
         cy.get(main_page.login_button).click(); // нажали кнопку "Войти"

         cy.get(result_page.title).contains('Нужно исправить проблему валидации') // верный текст об ошибке авторизации
         cy.get(result_page.title).should('be.visible') // текст виден пользователю
         
     })

    it('Логин в неверном регистре и верный пароль', function () {
       
         cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввели логин в неверном регистре
         cy.get(main_page.password).type(data.password); // ввели верный пароль
         cy.get(main_page.login_button).click(); // нажали кнопку "Войти"

         cy.get(result_page.title).contains('Авторизация прошла успешно') // проверка сообщения об успешной авторизации
         cy.get(result_page.title).should('be.visible') // текст виден пользователю
        
     })

    })