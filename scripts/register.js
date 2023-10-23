'use strict';

const btnSubmit = document.querySelector('#btn-submit');
const firstNameInput = document.querySelector('#input-firstname');
const lastNameInput = document.querySelector('#input-lastname');
const usernameInput = document.querySelector('#input-username');
const passwordInput = document.querySelector('#input-password');
const passwordConfirm = document.querySelector('#input-password-confirm');

// Hàm validate dữ liệu
const inputValidate = function (user) {
  let isValidate = true;

  if (user.firstName.trim() === '') {
    alert('Vui lòng nhập First Name!');
    isValidate = false;
  }

  if (user.lastName.trim() === '') {
    alert('Vui lòng nhập Last Name!');
    isValidate = false;
  }

  if (user.username.trim() === '') {
    alert('Vui lòng nhập Username!');
    isValidate = false;
  }

  if (user.password === '') {
    alert('Vui lòng nhập Password!');
    isValidate = false;
  }

  if (passwordConfirm.value === '') {
    alert('Vui lòng xác nhận lại Password!');
    isValidate = false;
  }

  if (!userArr.every(u => u.username !== user.username)) {
    alert('Username đã tồn tại!');
    isValidate = false;
  }

  if (user.password !== passwordConfirm.value) {
    alert('Password và Confirm Password phải giống nhau!');
    isValidate = false;
  }

  if (user.password.length <= 8) {
    alert('Password phải có nhiều hơn 8 ký tự!');
    isValidate = false;
  }

  return isValidate;
};

// Bắt sự kiện vào nút Register
btnSubmit.addEventListener('click', function () {
  const user = new User(
    firstNameInput.value,
    lastNameInput.value,
    usernameInput.value,
    passwordInput.value
  );
  const isValidate = inputValidate(user);

  if (isValidate) {
    userArr.push(user);
    saveToStorage('userArr', userArr);
    window.location.href = '../pages/login.html';
  }
});
