'use strict';

class Gallery {

  constructor() {
    this.initGallery();
    this.bindEventListeners();  
  }

  static PHOTO_SOURCE_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=50';
  static GALLERY_ID = 'gallery';
  static GALLERY_ITEM_TEMPLATE_ID = 'gallery-item-template';
  static FULL_PHOTO_TEMPLATE_ID = 'full-photo-template';  
  static PHOTO_ITEM_CLASS = 'photo-item';
  static BACKGROUND_ID = 'background-layout';
  static FULL_PHOTO_ID = 'full-photo';
  static HIDEN_CLASS = 'hidden';
  static DELETE_BTN_CLASS = 'delete-btn';

  gallery = document.getElementById(Gallery.GALLERY_ID);
  galleryItemTemplate = 
          document.getElementById(Gallery.GALLERY_ITEM_TEMPLATE_ID).innerHTML;
  background = document.getElementById(Gallery.BACKGROUND_ID);
  fullPhoto = document.getElementById(Gallery.FULL_PHOTO_ID);
  fullPhotoTemplate = 
              document.getElementById(Gallery.FULL_PHOTO_TEMPLATE_ID).innerHTML;
    
  initGallery() {
    this.getPhotos().then(data => {
      data.forEach(element => {
        this.createGallery(element.url, element.thumbnailUrl);       
      });                 
    });
  }
              
  async getPhotos() {
    const response = await fetch(Gallery.PHOTO_SOURCE_URL);  
    const responseArr = await response.json();

    return responseArr;
  }

  createGallery(fullPhotoUrl, thumbnailUrl) {
    let galleryItemTemplate = 
        this.galleryItemTemplate.replace('{{thumbnail-url}}', thumbnailUrl)
                                .replace('{{full-photo-url}}', fullPhotoUrl);
                                            
    this.gallery.innerHTML += galleryItemTemplate;
  }  

  onGalleryClick(event) {
    if (event.target.classList.contains(Gallery.PHOTO_ITEM_CLASS))
      this.displayFullPhoto(event.target);
  }

  onFullPhotoClick(event) {
    if (event.target.classList.contains(Gallery.DELETE_BTN_CLASS))
      this.hideFullPhoto();
  }

  displayPhoto(elem) {
    let fullPhotoTemplate = 
      this.fullPhotoTemplate.replace('{{url}}', elem.dataset.url);                                                      
                                            
    this.fullPhoto.innerHTML = fullPhotoTemplate;
  }

  hideFullPhoto() {
    this.fullPhoto.innerHTML = '';
    this.hideBackground();
  }

  displayBackground() {
    this.background.classList.remove(Gallery.HIDEN_CLASS);
  }

  hideBackground() {
    this.background.classList.add(Gallery.HIDEN_CLASS);
  }

  displayFullPhoto(elem) {
    this.displayBackground();
    this.displayPhoto(elem);
  }

  bindEventListeners() {
    this.gallery.addEventListener('click', this.onGalleryClick.bind(this));
    this.fullPhoto.addEventListener('click', this.onFullPhotoClick.bind(this));
  }  
}

const gallery = new Gallery();

