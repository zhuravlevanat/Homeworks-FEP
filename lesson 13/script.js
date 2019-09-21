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
    gallery.innerHTML = document.getElementById('galleryTemplate').innerHTML;
    document.querySelector('body').prepend(gallery);
    return gallery;
  }

  getGalleryItems() {
    return this.elem.children;
  }

  setItemInGallery(image) {
    document.querySelector('.gallery-item').innerHTML = image.innerHTML;    
  }

  showGalleryItems (item=this.index) {
    const galleryItems = this.getGalleryItems();
    this.setItemInGallery(galleryItems[item]);
  }

  next() {
    const arr = this.getGalleryItems();
    this.index++;
    if(this.index == arr.length) this.index = 0;
    this.setItemInGallery(arr[this.index]);
  }

  prev() {
    const arr = this.getGalleryItems();
    this.index--;
    if(this.index < 0) this.index = arr.length-1;
    this.setItemInGallery(arr[this.index]);
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
    // this.prev = this.prev.bind(this);
    // document.querySelector('.gallery').addEventListener('click', function(event) {
    //   const target = event.target;      
    //   if (target.classList.contains('gallery-left-button')) {
    //     this.prev;
    //   }
             
      
    // });
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
myGallery.showGalleryItems(3);

// myGallery.show(2);
// myGallery.next();
// myGallery.prev();