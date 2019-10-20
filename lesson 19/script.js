'use strict';
const PHOTO_SOURCE_URL = 'https://jsonplaceholder.typicode.com/photos';
const ADD = 49;
const GALLERY_ITEM_TEMPLATE = document.getElementById('galleryItemTemplate').innerHTML;
const PAGINATION_LINK_CLASS = 'page-link';
const FIRST_ELEM_IN_PAG = 'first-page';
const LAST_ELEM_IN_PAG = 'last-page';
const ADDING = 5;

const galleryElement = document.getElementById('gallery');
const pagination = document.getElementById('pagination');

pagination.addEventListener('click', onPaginationClick);

let Arr;
let currentPage = 1;

function onPaginationClick(event) {
  event.preventDefault();
  if (event.target.classList.contains(PAGINATION_LINK_CLASS)) {
    switch(true) {
      case event.target.classList.contains('next'):
        getNextPage(event.target);
        break
      case event.target.classList.contains('prev'):
        getPreviousPage(event.target);
        break
      default: getCurrentPage();
    }
  }
 }

function getNextPage() {
  if (elem.classList.contains(LAST_ELEM_IN_PAG)){
    shiftPagesToRight();
  } else {
    currentPage++;
  }
    displayPhotos();  
}

function getPreviousPage(elem) {
  if (elem.classList.contains(FIRST_ELEM_IN_PAG)){
    shiftPagesToLeft();
  } else {
    currentPage--;
  }
    displayPhotos();
}
  
function shiftPagesToLeft() { 
  const coll = pagination.children;
  for (let index = 1; index < coll.length-1; index++) {
    value = coll[index].innerHTML;
    coll[index].innerHTML= (value-ADDING);    
  }   
}

function shiftPagesToRight() { 
  const coll = pagination.children;
  for (let index = 1; index < coll.length-1; index++) {
    value = coll[index].innerHTML;
    coll[index].innerHTML= (value+ADDING);    
  }   
}

function getCurrentPage() {
  console.log('current');
}

init();

function init() {  
  getPhotos();
  createPagination();
  renderPhotosInGallery();
}

function requestJson(url) {
  return fetch(url)
  .then(response => response.json())  
}

function getPhotos() {
  return requestJson(PHOTO_SOURCE_URL)
  .then(setPhotoDataInLS);
}

function setPhotoDataInLS(data) {
  return localStorage.setItem('photos', JSON.stringify(data));
}

function getPhotosData() {
  return localStorage.getItem('photos');
}


function photosDataForPage(page) {
  const brr = JSON.parse(getPhotosData());
  let photosForPage = brr.filter(data => data.id<(ADD+page))
  return photosForPage
}

function renderPhotosInGallery() {
  const data = photosDataForPage(currentPage);
  galleryElement.innerHTML = data.map(photo => {
    return GALLERY_ITEM_TEMPLATE.replace('{{id}}', photo.id)
                             .replace('{{thumbnail-url}}', photo.thumbnailUrl)
  }).join('');
}

function createPagination(initialValue) {
  
  
}



// this.getPhotos().then(data => {
//   data.forEach(element => {
//     this.createGallery(element.url, element.thumbnailUrl);       
//   });                 
// });

// let todoList = [];

// function onNewTodoFormSubmit(e) {
//   e.preventDefault();

//   createTodo({
//     title: newTodoTitleElement.value
//   });

// }

// function onListClick(e) {
//   const id = event.target.dataset.todoId; 

//   if(id) {
//     deleteTodo(id);
//   }
// }

// function deleteTodo(id) {
//   todoList = todoList.filter((el => {
//     return el.id != id;
//   }))

//   setTodoList(todoList);
//   renderTodosList(todoList);
// }

// function createTodo(todo) {
//   todo.id = Data.now();
//   todoList.push(todo);

//   setTodoList(todoList);
//   renderTodosList(todoList);
// }

// function setTodoList(data) {
//   return localStorage.setItem('todo', JSON.stringify(data));
// }

// function init() {
//   let todoList = getTodosList();
//   todoList = todoList ? JSON.parse(todoList) : []

//   renderTodosList(todoList);
// }



// function getTodosList() {
//   return localStorage.getItem('todos');
// }

// function renderTodosList(data) {
//   listElement.innerHTML = data.map(todo => {
//     return TODO_ITEM_TEMPLATE.replace('{{id}}', todo.id)
//                              .replace('{{title}}', todo.title)
//   }).join('');
// }

