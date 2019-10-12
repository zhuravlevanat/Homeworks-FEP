'use strict';

const USERS_LIST_CLASS = 'users-list-container';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const USERS_LIST_ITEM_CLASS = 'users-list-item';

const usersListContainer = document.querySelector('.users-list-container');
const usersListItemTemplate = 
      document.getElementById('usersListItemTemplate').innerHTML;
const userDetailsTemplate = 
      document.getElementById('userDetailsTemplate').innerHTML;
const userDetailsContainer = document.querySelector('.user-details-container');

fetch(USERS_URL)
  .then(response => response.json())
  .then((data) => {
    addListOfUsers(data);
    return data;
  })
  .then((data) => fetch(USERS_URL+'/'+ data[0].id))
  .then(response => response.json())
  .then(addUsersListDetails)

function addListOfUsers(list) {
  const listItems = document.createElement('ul');

  const users = list.map((elem) => {
    return usersListItemTemplate.replace('{{name}}', elem.name)
                                .replace('{{id}}', elem.id);
  });

  listItems.innerHTML = users.join('\n');
  usersListContainer.append(listItems);
}

function addUsersListDetails(elem) {
  const userDetails = 
        userDetailsTemplate.replace('{{name}}', elem.name)
                           .replace('{{username}}', elem.username)
                           .replace('{{address}}', `</br> 
                                                    ${elem.address.zipcode}</br>
                                                    ${elem.address.city}</br>
                                                    ${elem.address.street}</br> 
                                                    ${elem.address.suite}
                                                    `)
                            .replace('{{phone}}', elem.phone)
                            .replace('{{website}}', elem.website)
                            .replace('{{company}}', `</br>
                                                    ${elem.company.name}</br>
                                                    ${elem.company.catchPhrase}</br>
                                                    ${elem.company.bs}
                                                    `);
 
  userDetailsContainer.innerHTML= userDetails;
}

usersListContainer.addEventListener('click', onUsersListClick);

function onUsersListClick(event) {
  if (event.target.classList.contains(USERS_LIST_ITEM_CLASS)) {
    const elemID = event.target.dataset.id;
    fetch(USERS_URL+'/'+elemID)
      .then(response => response.json())
      .then(addUsersListDetails)
  }
}