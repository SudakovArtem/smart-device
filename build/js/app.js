'use strict';

(function () {
  var modal = document.querySelector('.modal-overlay');
  var closeButton = modal.querySelector('.modal__close');
  var callButton = document.querySelector('.header__btn');
  var navigation = document.querySelector('.footer-top-navigation');
  var contacts = document.querySelector('.footer-top-contacts');
  var navigationToggle = document.querySelector('.footer-top-navigation__button');
  var contactsToggle = document.querySelector('.footer-top-contacts__btn');
  var modalForm = modal.querySelector('form');
  var modalName = modal.querySelector('[name=name]');
  var modalTel = modal.querySelector('[name=tel]');
  var modalComment = modal.querySelector('[name=comment]');
  var inputTel = document.querySelector('#tel');

  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('formData');
  } catch (err) {
    isStorageSupport = false;
  }

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

  if (modal) {
    closeButton.addEventListener('click', closeOrderForm);
    modal.addEventListener('click', closeOrderForm);
    window.addEventListener('keydown', closeOrderForm);
    modalForm.addEventListener('submit', function () {
      if (isStorageSupport) {
        var formData = {
          name: modalName.value,
          tel: modalTel.value,
          comment: modalComment.value
        };
        localStorage.setItem('formData', JSON.stringify(formData));
      }
    });
  }

  function closeOrderForm(event) {
    var element = event.target;

    if (element.classList.contains('modal-overlay') || event.keyCode === 27 || element.classList.contains('modal__close')) {
      modal.classList.remove('modal-overlay--opened');
    }
  }

  function openCallForm(event) {
    event.preventDefault();
    modal.classList.add('modal-overlay--opened');
    modalTel.addEventListener('input', mask, false);
    modalTel.addEventListener('focus', mask, false);
    if (storage) {
      var storageParse = JSON.parse(storage);
      modalName.value = storageParse.name;
      modalTel.value = storageParse.tel;
      modalComment.value = storageParse.comment;
    } else {
      modalName.focus();
    }
  }

  function mask(event) {
    var matrix = '+7 (___) ___ ____';
    var i = 0;
    var def = matrix.replace(/\D/g, '');
    var val = event.target.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    event.target.value = matrix.replace(/./g, function (a) {
      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      } else {
        return i >= val.length ? '' : a;
      }
    });
    if (event.target.type === 'blur') {
      if (event.target.value.length === 2) {
        event.target.value = '';
      }
    }
  }

  inputTel.addEventListener('input', mask, false);
  inputTel.addEventListener('focus', mask, false);
})();
