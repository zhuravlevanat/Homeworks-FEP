'use strict';

const newTask = document.getElementById('new-task');
const tasksList = document.getElementById('tasks-list');
const btnAddTask = document.getElementById('btn-add-task');

function createTask(taskName) {
  const task = document.createElement('li');
  task.className = 'task-list-item';
  task.textContent = taskName;
  const iconDeleteTask = document.createElement('i');
  iconDeleteTask.className =
    'delete-icon fas fa-times';
  task.append(iconDeleteTask);
  return task;
}

function addNewTask(taskName) {  
  const task = createTask(taskName);
  tasksList.append(task);   
}

function removeTask(task) {
  task.remove();
}

function markTask(task) {
  task.classList.toggle('task-done');
}

function clearInput() {
  newTask.value = '';
}

function onAddTaskBtnClick() {
  const newTaskName = newTask.value && newTask.value.trim();
  addNewTask(newTaskName);
  clearInput();
 }

btnAddTask.addEventListener('click', event => {
  event.preventDefault();
  onAddTaskBtnClick();
});

newTask.addEventListener('submit', event => {
  event.preventDefault();
  if (event.keyCode === 13) {
    onAddTaskBtnClick();
  }
});

tasksList.addEventListener('click', event => {
  if (event.target.classList.contains('delete-icon')) {
    removeTask(event.target.parentElement);
  } else if (event.target.classList.contains('task-list-item')) {
    markTask(event.target);
  } else return;
});


