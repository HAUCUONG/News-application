'use strict';

const inputUsername = document.querySelector('#input-username');
const inputPassword = document.querySelector('#input-password');
const btnSubmit = document.querySelector('#btn-submit');

// Hàm validate dữ liệu
const dataValidate = function () {
  let isValidate = true;

  if (inputUsername.value === '') {
    alert('Vui lòng nhập Username!');
    isValidate = false;
  }

  if (inputPassword.value === '') {
    alert('Vui lòng nhập Password!');
    isValidate = false;
  }

  return isValidate;
};

// Bắt sự kiện vào nút Login
btnSubmit.addEventListener('click', function () {
  const validate = dataValidate();

  if (validate) {
    const userLogin = userArr.find(
      user =>
        user.username === inputUsername.value &&
        user.password === inputPassword.value
    );

    if (userLogin) {
      saveToStorage('currentUser', userLogin);
      window.location.href = '../index.html';
    } else alert('Vui lòng kiểm tra lại thông tin đăng nhập!');
  }
});
