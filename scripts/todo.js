'use strict';

const btnAdd = document.querySelector('#btn-add');
const inputTask = document.querySelector('#input-task');
const todoContainer = document.querySelector('#todo-list');
const btnDelete = document.querySelector('.close');

let curUserTodoList;

//Hàm hiển thị các task
const displayTask = function () {
  let html = '';

  curUserTodoList.forEach(todo => {
    if (todo.isDone)
      html += `<li class='task checked'>${todo.task}<span class="close">×</span></li>`;
    else
      html += `<li class='task'>${todo.task}<span class="close">×</span></li>`;
  });

  todoContainer.innerHTML = html;
};

// Hàm lấy ra mảng chức các task của user hiện tại
const getCurUserTodoList = () => {
  curUserTodoList = todoArr.filter(todo => todo.owner === currentUser.username);
  return curUserTodoList;
};

// //Hàm hiển thị các task của user hiện tại
const displayCurUserTodolist = function () {
  getCurUserTodoList();
  displayTask();
};

displayCurUserTodolist();

// Bắt sự kiện vào nút Add
btnAdd.addEventListener('click', function () {
  if (inputTask.value.trim() !== '') {
    const todo = new Task(inputTask.value, currentUser.username, false);

    todoArr.push(todo);
    saveToStorage('todoArr', todoArr);
    displayCurUserTodolist();

    inputTask.value = '';
  }
});

// Dùng Event Delegation
todoContainer.addEventListener('click', function (e) {
  // Xử lý việc nhấp vào task thì đánh dấu task đó đã hoàn thành và lưu xuống localStorage
  if (e.target.classList.contains('task')) {
    e.target.classList.toggle('checked');

    todoArr.forEach(todo => {
      if (
        todo.task === e.target.textContent.slice(0, -1) &&
        todo.owner === currentUser.username
      ) {
        if (e.target.classList.contains('checked')) todo.isDone = true;
        else todo.isDone = false;

        saveToStorage('todoArr', todoArr);
      }
    });
  }

  // Bắt sự kiện vào nút delete tasl
  if (e.target.classList.contains('close')) {
    const index = todoArr.findIndex(
      todo => todo.task === e.target.parentElement.textContent.slice(0, -1)
    );

    todoArr.splice(index, 1);

    saveToStorage('todoArr', todoArr);
    displayCurUserTodolist();
  }
});
