'use strict';

// Hàm lưu dữ liệu
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

// Hàm lấy dữ liệu
const getFromStorage = function (key, def) {
  return JSON.parse(localStorage.getItem(key)) ?? def;
};

// Hàm chuyển Object trở lại thành Instance
const parseUser = function (userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );

  return user;
};

const parseTask = function (todo) {
  const task = new Task(todo.task, todo.owner, todo.isDone);

  return task;
};

// Lấy dữ liệu từ localStorage
const users = getFromStorage('userArr', []);
const userArr = users.map(user => parseUser(user));

let currentUser = getFromStorage('currentUser')
  ? parseUser(getFromStorage('currentUser'))
  : null;

const todos = getFromStorage('todoArr', []);
const todoArr = todos.map(todo => parseTask(todo));
// localStorage.removeItem('userArr');
// localStorage.removeItem('todoArr');
