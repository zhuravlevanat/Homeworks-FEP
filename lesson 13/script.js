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
  }
  show(photos) {
    let offset =0;
    [].forEach.call(photos, function(elem) { 
      setTimeout(function() {
        galleryPlace.append(elem);                       
      }, 1000+offset);
      offset+=1000;
      setTimeout(function() {
        elem.classList.add('hidden');
               
        }, 1000+offset);
        offset+=1000;
    });
  }

  createGallery() {
    
    const galleryPlace = document.createElement('div');
    galleryPlace.classList='gallery';
    this.elem.before(galleryPlace);
    const photoItems = this.elem.children;
    this.show(photoItems);

  }
}
  // showPhotos() {
  //   let offset =0;
  //   const list = this.createGallery().children;
  //   [].forEach.call(list, function(elem) {     
               
  //       setTimeout(function() {
  //         elem.classList.remove('hidden');
         
  //       }, 1000+offset);
  //       offset+=1000;
  //       setTimeout(function() {
  //         elem.classList.add('hidden');
         
  //       }, 1000+offset);
  //       offset+=1000;
      
       
  //     // HEAD, текст, BODY
  //   });
    // for (let i = 0; i < list.length; i++) {
    //   console.log(list[i]);
    //   list[i].classList.remove('hidden');
    //   setTimeout(function() {
    //     list[i].classList.add('hidden');
    //   }, 3000);
      
      
       
    // }
    
  


const myGallery = new Gallery(document.getElementById('container'));
myGallery.createGallery();