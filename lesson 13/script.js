'use strict';  

class Gallery {
  constructor(elem) {
    this.elem = elem;
    this.index = 0;
    this.interval;
    this.createGallery();       
  }

  createGallery() {    
    const gallery = document.createElement('div');
    gallery.classList='gallery';
    gallery.innerHTML = document.getElementById('galleryTemplate').innerHTML;
    this.elem.before(gallery);
  } 

  getGalleryItems() {
    return this.elem.children;
  }

  setItemInGallery(image) {
    document.querySelector('.gallery-item').innerHTML = image.innerHTML;    
  }

  showGalleryItem(elem) {     
    this.setItemInGallery(elem);
  }

  initGallery() {
    const arr = this.getGalleryItems(); 
    this.showGalleryItem(arr[this.index]);
    this.interval = setInterval(() => this.next(), 3000);
    this.listeners();    
  }
  
  next() {
    const arr = this.getGalleryItems();
    this.index++;
    if(this.index === arr.length) this.index = 0;
    this.showGalleryItem(arr[this.index]);
  }

  prev() {
    const arr = this.getGalleryItems();
    this.index--;
    if(this.index < 0) this.index = arr.length-1;
    this.showGalleryItem(arr[this.index]);
  }

  show(index) {
    this.index = index;
    const arr = this.getGalleryItems();
    this.showGalleryItem(arr[this.index]);
  }

  pauseGallery() {
    clearInterval(this.interval);
 }  

  listeners() {
    document.querySelector('.gallery').addEventListener('click', (event) => {
      const target = event.target;      
      if (target.classList.contains('gallery-left-button')) {
        this.prev();
      } else if (target.classList.contains('gallery-right-button')) {
        this.next();
      } else if (target.classList.contains('gallery-stop-button')) {
        this.pauseGallery();
      }
    });
  }
}  

const myGallery = new Gallery(document.getElementById('container'));

myGallery.initGallery();
//myGallery.show(3);
//myGallery.next();
//myGallery.prev();