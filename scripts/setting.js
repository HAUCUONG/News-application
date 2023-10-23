'use strict';

const inputPageSize = document.querySelector('#input-page-size');
const inputCategory = document.querySelector('#input-category');
const btnSubmit = document.querySelector('#btn-submit');

// Khi vừa vào trang Setting thì sẽ hiện sẵn dữ liệu của user hiện tại
inputPageSize.value = currentUser.pageSize;
inputCategory.value = currentUser.category;

// Hàm validate dữ liệu
const validate = function () {
  let isValidate = true;

  if (!Number.isFinite(Number.parseInt(inputPageSize.value))) {
    alert('News per page không hợp lệ!');
    isValidate = false;
  }

  if (inputCategory.value === '') {
    alert('Vui lòng chọn News Caterogy!');
    isValidate = false;
  }

  return isValidate;
};

// Bắt sự kiện vào nút Save Settings
btnSubmit.addEventListener('click', function () {
  if (validate()) {
    currentUser.pageSize = Number.parseInt(inputPageSize.value);
    currentUser.category = inputCategory.value;
    saveToStorage('currentUser', currentUser);

    const index = userArr.findIndex(
      user => user.username === currentUser.username
    );
    userArr[index] = currentUser;
    saveToStorage('userArr', userArr);

    alert('Cài đặt thành công!');
  }
});
