'use strict';

const USERS_LIST_CLASS = 'users-list-container';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const USERS_LIST_ITEM_CLASS = 'users-list-item';
const BTN_DELETE_USER = 'delete-btn';
const BTN_EDIT_USER = 'edit-btn';

const usersListContainer = document.querySelector('.users-list-container');
const usersListItemTemplate = 
      document.getElementById('usersListItemTemplate').innerHTML;
const userDetailsContainer = document.querySelector('.user-data-container');
const userDataForm = document.getElementById('userDataForm');
const addUserButton = document.getElementById('addUserButton');
const saveUserDetailsButton = document.getElementById('saveBtn');
const deleteBtn = document.querySelector('.delete-btn');
const editBtn = document.querySelector('.edit-btn');
const fullNameInput = document.getElementById('fullNameInput');
const userNameInput = document.getElementById('userNameInput');
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');
const inputs = document.getElementsByTagName('input');
let isEdited = false;
let currentId;

init();

function init() {
  getUsersList()
}

function requestJson(url, options = {}) {
  return fetch(url, { 
    method: options.method,
    headers: options.headers,
    body: JSON.stringify(options.body)
  })
  .then(response => response.json())  
}

function setRequestOptions(method, headers, body) {
  return {
    method: method,
    headers: {
      headers
    },
    body: body
  }
}

function getUsersList() {
  return requestJson(USERS_URL)
  .then(renderUsersList)
}

function getUserData(id) {
  return requestJson(USERS_URL+'/'+id)
  .then(renderUserDeta)
}

function renderUsersList(list) {
  usersListContainer.innerHTML = '';
  const listItems = document.createElement('ul');  

  const users = list.map((elem) => {
    return usersListItemTemplate.replace('{{name}}', elem.name)
                                .replace('{{id}}', elem.id);
  });

  listItems.innerHTML = users.join('\n');
  usersListContainer.append(listItems);
  return list;
}

function renderUserDeta(user) {
  setFormValues(user.name, user.username, user.phone, user.email);
  currentId = user.id;
  viewMode(); 
  return user;
}

function creationMode() {
  resetForm();
  saveUserDetailsButton.classList.remove('hidden');
  deleteBtn.classList.add('hidden');
  editBtn.classList.add('hidden');
  setFocus(fullNameInput);
}

function editingMode() {
  activateForm(inputs);
  saveUserDetailsButton.classList.remove('hidden');
  deleteBtn.classList.add('hidden');
  editBtn.classList.add('hidden');
  setFocus(fullNameInput);
}

function viewMode() {
  disableForm(inputs);
  saveUserDetailsButton.classList.add('hidden');
  deleteBtn.classList.remove('hidden');
  editBtn.classList.remove('hidden');
}

usersListContainer.addEventListener('click', onUsersListClick);
addUserButton.addEventListener('click', onUserButtonClick);
userDetailsContainer.addEventListener('click', onUserDetailsClick)
userDataForm.addEventListener('submit', (event) => {
  if (!isEdited) {
    onAddUserFormSubmit(event);
  } else {
    onEditUserFormSubmit(event);
  }
});

function onUsersListClick(event) {
  if (event.target.classList.contains(USERS_LIST_ITEM_CLASS))
      getUserData(event.target.dataset.id);      
}

function onUserButtonClick() {
  creationMode();
}

function onUserDetailsClick(event) {
  switch (true){
    case event.target.classList.contains(BTN_DELETE_USER):
    deleteUser(currentId);
    break
    case event.target.classList.contains(BTN_EDIT_USER): 
    isEdited = true;
    editingMode(); 
    break
  }
}

function onAddUserFormSubmit(event) {
  event.preventDefault();
  addUser();
}

function onEditUserFormSubmit(event) {
  event.preventDefault();
  editUser(currentId);
}

function addUser() {
  const user = getFormValues();
  const options = setRequestOptions('POST', `Content-Type: application/json`, user);
  requestJson(USERS_URL, options);
  viewMode();
  getUsersList();
}

function editUser(id) {
  const user = getFormValues();
  const options = setRequestOptions('PUT', `Content-Type: application/json`, user);

  requestJson(USERS_URL+'/'+id, options);
  isEdited = false;
  viewMode();
  getUsersList();  
}

function deleteUser(id) {
  const options = setRequestOptions('DELETE', `Content-Type: application/json`, null);
  
  requestJson(USERS_URL +'/'+id, options);
  creationMode(); 
  getUsersList();
}

function disableForm(elements) {
  let length = elements.length;
  while(length--) {
    elements[length].disabled = true;
  }
}

function activateForm(elements) {
  let length = elements.length;
  while(length--) {
    elements[length].disabled = false;
  }
}

function resetForm(){
  userDataForm.reset();
}

function setFocus(elem) {
  elem.focus();
}

function getFormValues() {
  return { 
    name: fullNameInput.value,
    username: userNameInput.value,
    phone: phoneInput.value,
    email: emailInput.value
  }
} 

function setFormValues(name, username, phone, email) {
  fullNameInput.value = name;
  userNameInput.value = username;
  phoneInput.value = phone;
  emailInput.value = email;
} 





