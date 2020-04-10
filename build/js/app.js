'use strict';

(function () {
  var overlayModal = document.querySelector('.modal-overlay');
  var closeButton = document.querySelector('.modal__close');
  var callButton = document.querySelector('.header__btn');
  var navigation = document.querySelector('.footer-top-navigation');
  var contacts = document.querySelector('.footer-top-contacts');
  var navigationToggle = document.querySelector('.footer-top-navigation__button');
  var contactsToggle = document.querySelector('.footer-top-contacts__btn');

  if (navigationToggle) {
    navigationToggle.addEventListener('click', function (event) {
      event.preventDefault();
      navigation.classList.toggle('active');
      navigationToggle.classList.toggle('pressed');
    });

    contactsToggle.addEventListener('click', function (event) {
      event.preventDefault();
      contacts.classList.toggle('active');
      contactsToggle.classList.toggle('pressed');
    });
  }

  callButton.addEventListener('click', openCallForm);

  if (overlayModal) {
    closeButton.addEventListener('click', closeOrderForm);
    overlayModal.addEventListener('click', closeOrderForm);
    window.addEventListener('keydown', closeOrderForm);
  }

  function closeOrderForm(event) {
    var element = event.target;

    if (element.classList.contains('modal-overlay') || event.keyCode === 27 || element.classList.contains('modal__close')) {
      overlayModal.classList.remove('modal-overlay--opened');
    }
  }

  function openCallForm(event) {
    event.preventDefault();
    overlayModal.classList.add('modal-overlay--opened');
  }
})();
