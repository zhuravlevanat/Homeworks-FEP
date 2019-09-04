'use strict';

const newTask = document.getElementById('new-task');
const tasksList = document.getElementById('tasks-list');
const formAddTask = document.getElementById('form-add-task');

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

function onAddTaskFormSubmit(event) {
  event.preventDefault();
  const newTaskName = newTask.value && newTask.value.trim();
  if (newTaskName !== '') {
    addNewTask(newTaskName);
    clearInput();
  }  
 }

function onTasksListClick(event) {
  if (event.target.classList.contains('delete-icon')) {
    removeTask(event.target.parentElement);
  } else if (event.target.classList.contains('task-list-item')) {
    markTask(event.target);
  } else return;
 }

formAddTask.addEventListener('submit', onAddTaskFormSubmit);

tasksList.addEventListener('click', onTasksListClick);


