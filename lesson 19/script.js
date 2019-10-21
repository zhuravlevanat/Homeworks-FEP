'use strict';
const PHOTO_SOURCE_URL = 'https://jsonplaceholder.typicode.com/photos';
const PAGINATION_LINK_CLASS = 'page-link';
const FIRST_ELEM_IN_PAG = 'first-page';
const LAST_ELEM_IN_PAG = 'last-page';
const GALLERY_ITEM_CLASS = 'photo-item';
const HIDDEN_CLASS = 'hidden';
const ACTIVE_CLASS = 'active';
const DELETE_BTN_CLASS = 'delete-btn';
const SHIFTED_VALUE = 5;
const NUMBER_OF_PHOTOS = 49;
const MAX_PAGE_NUMBER = 100;
const MIN_PAGE_NUMBER = 1;

const GALLERY_ITEM_TEMPLATE = 
      document.getElementById('galleryItemTemplate').innerHTML;
const FULL_PHOTO_TEMPLATE = 
      document.getElementById('fullPhotoTemplate').innerHTML;

const galleryElement = document.getElementById('gallery');
const fullPhoto = document.getElementById('full-photo');
const background = document.getElementById('background-layout');
const pagination = document.getElementById('pagination');
const prevEl = document.querySelector('.prev');
const nextEL = document.querySelector('.next');
let Arr;
let currentPage;

init();

//Event Listeners

galleryElement.addEventListener('click', onGalleryClick);
fullPhoto.addEventListener('click', onFullPhotoClick);
pagination.addEventListener('click', onPaginationClick);


function onGalleryClick() {
  if (event.target.classList.contains(GALLERY_ITEM_CLASS))
      displayFullPhoto(event.target);
  }

function onFullPhotoClick() {
  if (event.target.classList.contains(DELETE_BTN_CLASS))
  hideFullPhoto();
}

function displayFullPhoto(elem) {
  displayBackground();
  displayPhoto(elem);  
}

function displayPhoto(elem) {
  const fullPhotoTemplate = 
      FULL_PHOTO_TEMPLATE.replace('{{url}}', elem.dataset.url);                                                      
                                            
    fullPhoto.innerHTML = fullPhotoTemplate;
}

function hideFullPhoto() {
  fullPhoto.innerHTML = '';
  hideBackground();
}

function hideBackground() {
  background.classList.add(HIDDEN_CLASS);
}

function displayBackground() {
  background.classList.remove(HIDDEN_CLASS);
}

// Pagination

function onPaginationClick(event) {
  event.preventDefault();

  if (event.target.classList.contains(PAGINATION_LINK_CLASS)) {

    switch(true) {
      case event.target.classList.contains('next'):
        getNextPage();
        break
      case event.target.classList.contains('prev'):
        getPreviousPage();
        break
      default: getCurrentPage(event.target);
    }

    renderPhotosInGallery(currentPage);
    setItemsInLS('currentPage', currentPage);

  }
 }

 function getNextPage() {
  const elem = getPageElement();
  if (elem.classList.contains(LAST_ELEM_IN_PAG)){
    shiftPagesToRight();
  } else {
    currentPage++;    
  } 
  setCurrentPageActive(currentPage);   
}

function getPreviousPage() {
  const elem = getPageElement();
  if (elem.classList.contains(FIRST_ELEM_IN_PAG)){
    shiftPagesToLeft();    
  } else {
    currentPage--;    
  }
  setCurrentPageActive(currentPage);    
}

function getCurrentPage(elem) {
  currentPage = elem.innerHTML;
  setCurrentPageActive(currentPage);
}

function setCurrentPaginationValues(firstValue) {
  const pagItems = getPaginationItems();
  for (let i = 1; i < pagItems.length-1; i++) {
    pagItems[i].innerHTML = +firstValue + i - 1;
  }
}


function getPageElement() {
  const pagItems = getPaginationItems();
  for (let i = 1; i < pagItems.length-1; i++) {
    if (pagItems[i].innerHTML == currentPage) {
      return pagItems[i];
    }         
  }  
 }

function getPaginationItems() {
  return pagination.children
}
  
function shiftPagesToLeft() {  
  const pagItems = getPaginationItems();
  for (let i = 1; i < pagItems.length-1; i++) {
    const value = +pagItems[i].innerHTML;
    if (value <= MIN_PAGE_NUMBER) {
      prevEl.classList.add(HIDDEN_CLASS);
      return;
    }    
    pagItems[i].innerHTML= (value-SHIFTED_VALUE);    
  }
  currentPage = +pagItems[pagItems-2].innerHTML;    
}

function shiftPagesToRight() { 
  const pagItems = getPaginationItems();
  let firstPagElem;
  for (let i = 1; i < pagItems.length-1; i++) {
    const value = +pagItems[i].innerHTML;
    if (value >= MAX_PAGE_NUMBER) {
      nextEL.classList.add(HIDDEN_CLASS);
      return;
    }
    pagItems[i].innerHTML= value + SHIFTED_VALUE;      
  } 
  currentPage = +pagItems[1].innerHTML;
  firstPagElem = +pagItems[1].innerHTML
  setItemsInLS('first', firstPagElem);    
}

function setCurrentPageActive(pageValue) {
  if (currentPage > 1 && currentPage < 100) {
    prevEl.classList.remove(HIDDEN_CLASS);
  } else {
    prevEl.classList.add(HIDDEN_CLASS);
  }
  const pagItems = getPaginationItems();
 
  for (let i = 1; i < pagItems.length-1; i++) {
    pagItems[i].classList.remove(ACTIVE_CLASS);
    if (pagItems[i].innerHTML == pageValue) {
      pagItems[i].classList.add(ACTIVE_CLASS);
    }          
  }   
}

//Initialization

function init() {
  currentPage = JSON.parse(getItemsFromLS('currentPage')) || 1;
  getPhotos();
  renderPhotosInGallery(currentPage);  
  const firstPagElem = JSON.parse(getItemsFromLS('first')) || 1
  setCurrentPaginationValues(firstPagElem);
  setCurrentPageActive(currentPage);  
}

function requestJson(url) {
  return fetch(url)
  .then(response => response.json())  
}

function getPhotos() {
  return requestJson(PHOTO_SOURCE_URL)
  .then((data) => setItemsInLS('photos', data));
}

function setItemsInLS(name, data) {
  return localStorage.setItem(name, JSON.stringify(data));
}

function getItemsFromLS(name) {
  return localStorage.getItem(name);
}

function photosDataForPage(page) {
  const arrayOfPhotos = JSON.parse(getItemsFromLS('photos'));
  let photosForPage = arrayOfPhotos.filter(data => 
    data.id>(NUMBER_OF_PHOTOS*page-NUMBER_OF_PHOTOS) && data.id<(NUMBER_OF_PHOTOS*page))
  return photosForPage
}

function renderPhotosInGallery(page) {
  const data = photosDataForPage(page);
  galleryElement.innerHTML = data.map(photo => {
    return GALLERY_ITEM_TEMPLATE.replace('{{id}}', photo.id)
                                .replace('{{thumbnail-url}}', photo.thumbnailUrl)
                                .replace('{{full-photo-url}}', photo.url)
  }).join('');
}