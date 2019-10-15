'use strict';

const USERS_LIST_CLASS = 'users-list-container';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const USERS_LIST_ITEM_CLASS = 'users-list-item';
const BTN_DELETE_CLASS = 'delete-btn';

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

function getUsersList() {
  return requestJson(USERS_URL)
  .then(addListOfUsers)
}

function getUserDetails(id) {
  return requestJson(USERS_URL+'/'+id)
  .then(addUsersListDetails)
}

function resetForm(){
  addUserForm.reset();
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
}

usersListContainer.addEventListener('click', onUsersListClick);
addUserForm.addEventListener('submit', onAddTaskFormSubmit);

function onAddTaskFormSubmit(event) {
  event.preventDefault();
  addUser();
}

function addUser() {
  const user = { name: fullNameInput.value,
                 username: userNameInput.value,
                 phone: phoneInput.value,
                 email: emailInput.value
               };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: user
  }

  requestJson(USERS_URL, options);
  resetForm();
  getUsersList();  
}

function deleteUser(id) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }    
  }

  requestJson(USERS_URL +'/'+id, options);
  getUsersList();  
}

function onUsersListClick(event) {
  switch (true){
    case event.target.classList.contains(USERS_LIST_ITEM_CLASS):
        const elemID = event.target.dataset.id;
        getUserDetails(elemID);
        break
    case event.target.classList.contains(BTN_DELETE_CLASS):
        deleteUser(event.target.nextElementSibling.dataset.id);
        break
  }  
}