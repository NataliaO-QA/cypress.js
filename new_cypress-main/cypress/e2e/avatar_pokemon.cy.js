describe('Покупка аватара', function () {

    it('Покупка аватара', function () {
         cy.visit('https://pokemonbattle.ru/'); // зайти на сайт
         cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN'); // ввести логин
         cy.get('#password').type('USER_PASSWORD'); // ввести пароль
         cy.get('.auth__button').click(); // нажать кнопку "Войти"

         cy.get('.header__id-text_type_profile').contains(12393); // проверить, что видим номер id пользователя

         cy.get('.header__container > .header__id').click(); // нажать на поле с id, номером и фото аватара

         cy.get('.title-single__title').contains('Smally'); // проверить, что видим имя пользователя

         cy.get('[href="/shop"]').click(); // нажать кнопку "Смена аватара"
         cy.wait(2000);
         cy.get('.pokemon__title').contains('Магазин'); // проверить, что видим Магазин
        
         cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара (ИЗ ПРИМЕРА ДЛЯ ВЫПОЛНЕНИЯ ДЗ)
                          
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('5555 5555 5555 5599'); // ввести валидный номер карты
         cy.get(':nth-child(1) > .pay_base-input-v2').type('12/25'); // ввести валидный срок действия карты
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // ввести верный код cvv
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('Nata O'); // ввести имя 
         cy.get('.pay-btn').click(); // нажать книпку "Оплатить"
         cy.get('#cardnumber').type(56456); // ввести верный код из смс
         cy.get('.payment__submit-button').click(); // нажать кнопку "Отправить"
       
         cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // проверка, что получаем сообщение "Покупка прошла успешно"
     })
    })
