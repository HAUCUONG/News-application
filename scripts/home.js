'use strict';

const welcomeMessage = document.querySelector('#welcome-message');
const loginModel = document.querySelector('#login-modal');
const mainContent = document.querySelector('#main-content');
const btnLogout = document.querySelector('#btn-logout');
const sideBar = document.querySelector('.navigation');

// Hàm hiển thị trang Home khi có và không có người đăng nhập
const displayHome = function () {
  if (currentUser) {
    loginModel.style.display = 'none';
    mainContent.style.display = 'block';
    welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
  } else {
    mainContent.style.display = 'none';
    loginModel.style.display = 'block';
  }
};

displayHome();

// Bắt sự kiện vào nút Logout
btnLogout.addEventListener('click', function () {
  currentUser = null;
  saveToStorage('currentUser', currentUser);
  displayHome();
});

// Dùng Event Delegation để xử lý việc khi không có người đăng nhập thì không vào được những trang khác
sideBar.addEventListener('click', function (e) {
  e.preventDefault();

  if (!e.target.closest('li').classList.contains('active')) {
    if (currentUser) {
      if (e.target.textContent === 'News')
        window.location.href = '../pages/news.html';
      else if (e.target.textContent === 'Todo List')
        window.location.href = '../pages/todo.html';
      else if (e.target.textContent === 'Search')
        window.location.href = '../pages/search.html';
      else window.location.href = '../pages/setting.html';
    } else alert('Vui lòng Đăng nhập/ Đăng ký!');
  }
});
