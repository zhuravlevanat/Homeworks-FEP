'use strict';  
let intervalId; 

class Gallery {
  constructor(elem) {
    this.elem = elem;
    this.index = 0;       
  }

  createGallery() {    
    const gallery = document.createElement('div');
    gallery.classList='gallery';
    gallery.innerHTML = `
      <button class="gallery-button gallery-left-button">&lt;</button>
      <button class="gallery-button gallery-stop-button">&#9724;</button>
      <div class="gallery-item"></div>
      <button class="gallery-button gallery-right-button">&gt;</button>
      `;
    document.querySelector('body').prepend(gallery);
  }

  getGalleryItems() {
    return this.elem.children;
  }

  setPhotoInGallery(image) {
    document.querySelector('.gallery-item').innerHTML = image.innerHTML;    
  }

  showGalleryItems () {
    const galleryItems = this.getGalleryItems();
    this.setPhotoInGallery(galleryItems[this.index]);
  }

  next() {
    const arr = this.getGalleryItems();
    this.index++;
    if(this.index == arr.length) this.index = 0;
    this.setPhotoInGallery(arr[this.index]);
  }

  prev() {
    const arr = this.getGalleryItems();
    this.index--;
    if(this.index < 0) this.index = arr.length-1;
    this.setPhotoInGallery(arr[this.index]);
  }
  initGallery () {
    this.createGallery(); 
    this.showGalleryItems();
    intervalId = setInterval(this.next.bind(this), 3000);
    this.listeners();    
  }

  pauseGallery () {
    setInterval(function(){
      clearInterval(intervalId);
    });
 }  

  listeners () {
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.pauseGallery = this.pauseGallery.bind(this);
    document.querySelector('.gallery-left-button').addEventListener('click', this.next);
    document.querySelector('.gallery-right-button').addEventListener('click', this.prev);
    document.querySelector('.gallery-stop-button').addEventListener('click', this.pauseGallery);
  }
}  

const myGallery = new Gallery(document.getElementById('container'));

myGallery.initGallery();

// myGallery.show(2);
// myGallery.next();
// myGallery.prev();