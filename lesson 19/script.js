'use strict';
const PHOTO_SOURCE_URL = 'https://jsonplaceholder.typicode.com/photos';
const ADD = 49;
const PAGINATION_LINK_CLASS = 'page-link';
const FIRST_ELEM_IN_PAG = 'first-page';
const LAST_ELEM_IN_PAG = 'last-page';
const MAX_PAGE_NUMBER = 100;
const MIN_PAGE_NUMBER = 1;
const HIDDEN_CLASS = 'hidden';
const ACTIVE_CLASS = 'active';
const DELETE_BTN_CLASS = 'delete-btn';
const shiftedValue = 5;
const GALLERY_ITEM_CLASS = 'photo-item';
const GALLERY_ITEM_TEMPLATE = document.getElementById('galleryItemTemplate').innerHTML;
const FULL_PHOTO_TEMPLATE = document.getElementById('fullPhotoTemplate').innerHTML;

const galleryElement = document.getElementById('gallery');
const fullPhoto = document.getElementById('full-photo');
const background = document.getElementById('background-layout');
const pagination = document.getElementById('pagination');
const prevEl = document.querySelector('.prev');
const nextEL = document.querySelector('.next');

pagination.addEventListener('click', onPaginationClick);
galleryElement.addEventListener('click', onGalleryClick);
fullPhoto.addEventListener('click', onFullPhotoClick);

let Arr;
let currentPage = 1;

function onGalleryClick() {
  if (event.target.classList.contains(GALLERY_ITEM_CLASS))
      displayFullPhoto(event.target);
  }


function onFullPhotoClick() {
  if (event.target.classList.contains(DELETE_BTN_CLASS))
  hideFullPhoto();
}

function hideFullPhoto() {
  fullPhoto.innerHTML = '';
  hideBackground();
}

function hideBackground() {
  background.classList.add(HIDDEN_CLASS);
}

function displayFullPhoto(elem) {
  displayBackground();
  displayPhoto(elem);  
}

function displayBackground() {
  background.classList.remove(HIDDEN_CLASS);
}

function displayPhoto(elem) {
  console.log(elem.dataset.url)
  let fullPhotoTemplate = 
      FULL_PHOTO_TEMPLATE.replace('{{url}}', elem.dataset.url);                                                      
                                            
    fullPhoto.innerHTML = fullPhotoTemplate;
}

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
    renderPhotosInGallery();
  }
 }

 function getPageElement() {
  const coll = pagination.children;
  for (let index = 1; index < coll.length-1; index++) {
    if (coll[index].innerHTML == currentPage) {
      return coll[index];
    }     
  } 
 }

function getNextPage() {
  const elem = getPageElement();
  if (elem.classList.contains(LAST_ELEM_IN_PAG)){
    shiftPagesToRight();
    setCurrentPageActive(currentPage);
  } else {
    currentPage++;
    setCurrentPageActive(currentPage);
  }
    
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
  
function shiftPagesToLeft() { 
  const coll = pagination.children;
  for (let index = 1; index < coll.length-1; index++) {
    const value = +coll[index].innerHTML;
    if (value <= MIN_PAGE_NUMBER) {
      prevEl.classList.add(HIDDEN_CLASS);
      return;
    }    
    coll[index].innerHTML= (value-shiftedValue);    
  } 

  currentPage = +coll[coll.length-2].innerHTML;
    
}

function shiftPagesToRight() { 
  const coll = pagination.children;
  for (let index = 1; index < coll.length-1; index++) {
    const value = +coll[index].innerHTML;
    if (value >= MAX_PAGE_NUMBER) {
      nextEL.classList.add(HIDDEN_CLASS);
      return;
    }
    coll[index].innerHTML= (value+shiftedValue);
      
  } 
  currentPage = +coll[1].innerHTML;
    
}

function setCurrentPageActive(pageValue) {
  console.log(currentPage);
  if (currentPage > 1 && currentPage < 100) {
    prevEl.classList.remove(HIDDEN_CLASS);
  }else {
    prevEl.classList.add(HIDDEN_CLASS);
  }
  const coll = pagination.children;
  for (let index = 1; index < coll.length-1; index++) {
    coll[index].classList.remove(ACTIVE_CLASS);
    if (coll[index].innerHTML == pageValue) {
      coll[index].classList.add(ACTIVE_CLASS);
    }    
  }   
}

function getCurrentPage(elem) {
  currentPage = elem.innerHTML;
  console.log(currentPage);
  setCurrentPageActive(currentPage);

}

init();

function init() {  
  getPhotos();
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
  let photosForPage = brr.filter(data => data.id>(ADD*page-ADD) && data.id<(ADD*page))
  return photosForPage
}

function renderPhotosInGallery() {
  const data = photosDataForPage(currentPage);
  galleryElement.innerHTML = data.map(photo => {
    return GALLERY_ITEM_TEMPLATE.replace('{{id}}', photo.id)
                                .replace('{{thumbnail-url}}', photo.thumbnailUrl)
                                .replace('{{full-photo-url}}', photo.url)
  }).join('');
}