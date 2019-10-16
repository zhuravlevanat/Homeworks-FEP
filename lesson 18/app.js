'use strict';

const USERS_LIST_CLASS = 'users-list-container';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const USERS_LIST_ITEM_CLASS = 'users-list-item';
const BTN_DELETE_USER = 'delete-btn';
const BTN_EDIT_USER = 'edit-btn';

const usersListContainer = document.querySelector('.users-list-container');
const usersListItemTemplate = 
      document.getElementById('usersListItemTemplate').innerHTML;
const userDetailsTemplate = 
      document.getElementById('userDetailsTemplate').innerHTML;
const userDetailsContainer = document.querySelector('.user-details-container');
const addUserForm = document.getElementById('addUserForm');
const fullNameInput = document.getElementById('fullNameInput');
const userNameInput = document.getElementById('userNameInput');
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');
let isEdited = false;
let idOfEditedUser;

init();

function init() {
  getUsersList()
  .then((data) => getUserDetails(data[0].id))
}

function requestJson(url, options = {}) {
  return fetch(url, { 
    method: options.method,
    headers: options.headers,
    body: JSON.stringify(options.body)
  })
  .then(response => response.json())  
}

function setRequestOptions (method, headers, body) {
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
  .then(addListOfUsers)
}

function getUserDetails(id) {
  return requestJson(USERS_URL+'/'+id)
  .then(addUsersListDetails)
}

function addListOfUsers(list) {
  const listItems = document.createElement('ul');  

  const users = list.map((elem) => {
    return usersListItemTemplate.replace('{{name}}', elem.name)
                                .replace('{{id}}', elem.id);
  });

  listItems.innerHTML = users.join('\n');
  usersListContainer.append(listItems);
  return list;
}

function addUsersListDetails(elem) {
  const userDetails = 
        userDetailsTemplate.replace('{{name}}', elem.name)
                           .replace('{{username}}', elem.username)
                           .replace('{{phone}}', elem.phone)
                           .replace('{{email}}', elem.email);
 
  userDetailsContainer.innerHTML= userDetails;
  return elem;
}

usersListContainer.addEventListener('click', onUsersListClick);
addUserForm.addEventListener('submit', (event) => {
  if (!isEdited) {
    onAddUserFormSubmit(event);
  } else {
    onEditUserFormSubmit(event);
  }
});

function onUsersListClick(event) {
  switch (true){
    case event.target.classList.contains(USERS_LIST_ITEM_CLASS):
      getUserDetails(event.target.dataset.id);
      break
    case event.target.classList.contains(BTN_DELETE_USER):
      deleteUser(event.target.nextElementSibling.dataset.id);
      break
    case event.target.classList.contains(BTN_EDIT_USER):
      idOfEditedUser = event.target.previousElementSibling.dataset.id;
      editForm(idOfEditedUser);
      isEdited = true;
      break
  }  
}

function onAddUserFormSubmit(event) {
  event.preventDefault();
  addUser();
}

function onEditUserFormSubmit(event) {
  event.preventDefault();
  editUser();
}

function addUser() {
  const user = getFormValues();
  const options = setRequestOptions('POST', `Content-Type: application/json`, user);
  requestJson(USERS_URL, options);
  resetForm();
  getUsersList();  
}

function editUser() {
  console.log(idOfEditedUser);
  const user = getFormValues();
  const options = setRequestOptions('PUT', `Content-Type: application/json`, user);

  requestJson(USERS_URL+'/'+idOfEditedUser, options);
  resetForm();
  isEdited = false;
  getUsersList();  
}

function deleteUser(id) {
  const options = setRequestOptions('DELETE', `Content-Type: application/json`, null);
  
  requestJson(USERS_URL +'/'+id, options);
  getUsersList();  
}

function resetForm(){
  addUserForm.reset();
}

function editForm(id) {
  const user = getUserDetails(id);
  user.then((res) => setFormValues(res.name, res.username, res.phone, res.email));  
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



