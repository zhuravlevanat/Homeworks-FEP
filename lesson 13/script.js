'use strict';

  
// class Gallery{

// }

// const myGallery = new Gallery(
//                         document.getElementById('container')
//                         )

/* Опциональное задание - реализовать такие методы */

// myGallery.show(2);
// myGallery.next();
// myGallery.prev();
class Gallery {
  constructor(elem) {
    this.elem = elem;
    this.index = 0;
  }

  createGallery() {    
    const gallery = document.createElement('div');
    gallery.classList='gallery';
    gallery.innerHTML = `<button class="gallery-button gallery-left-button">&lArr;</button>
                         <div class="gallery-item"></div>
                         <button class="gallery-button gallery-right-button">&rArr;</button>`;
    document.querySelector('body').prepend(gallery);
  }

  getGalleryItems() {
    return this.elem.children;
  }

  setPhotoInGallery(image) {
    document.querySelector('.gallery-item').innerHTML = image.innerHTML;    
  }

  showGalleryItem () {
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
    if(this.index == arr.length) this.index = 0;
    this.setPhotoInGallery(arr[this.index]);
  }
  init () { 
    this.showGalleryItem ();
    setInterval(this.next.bind(this), 3000); 
  }
  

    // listeners () {

    // document.querySelector('.gallery-left-button').addEventListener('click', this.next);
    // document.querySelector('.gallery-left-button').addEventListener('click', this.prev);
    // }
}  

const myGallery = new Gallery(document.getElementById('container'));
myGallery.createGallery();
myGallery. showGalleryItem ();
//myGallery.next();
//myGallery.listeners();
//myGallery.init();