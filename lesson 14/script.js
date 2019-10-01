'use strict';

const TABSET_CONTAINER_CLASS = 'tabset';
const TABSET_HEADING_CLASS = 'tabset-heading';
const TABSET_BODY_CLASS = 'tabset-body';
const TABSET_ACTIVE_HEADING = 'active-heading';
const TABSET_ACTIVE_BODY = 'active-body';


class Tabset {
  constructor(el) {
    this.el = el;
    this.index = 1;
    this.bindClasses();
    this.bindEventListener(); 
  }

  bindClasses() {
    this.el.classList.add(TABSET_CONTAINER_CLASS);
  }
  
  bindEventListener() {
    this.el.addEventListener('click', this.onElementClick.bind(this));
 }

  getCollectionOfHeadings() {
    return this.el.firstElementChild.children;
  }

  getCollectionOfBodies() {
    return this.el.lastElementChild.children;
  }

  getCollectionLength() {
    return this.getCollectionOfHeadings().length;
  }

  static displayTabBody(el) {
    return el.classList.add(TABSET_ACTIVE_BODY);
  }

  static hideTabBody(el) {
    return el.classList.remove(TABSET_ACTIVE_BODY);
  }

  static markTabHeading(el) {
    return el.classList.add(TABSET_ACTIVE_HEADING);
  }

  static unmarkTabHeading(el) {
    return el.classList.remove(TABSET_ACTIVE_HEADING);
  } 

  show(index) {
    this.index = index;
    const collectionOfHeadings = this.getCollectionOfHeadings();
    const collectionOfBodies = this.getCollectionOfBodies(); 
    
    Array.prototype.forEach.call(collectionOfHeadings, (el) => {
      Tabset.unmarkTabHeading(el);
      if (el.dataset.headingId == this.index) {
        Tabset.markTabHeading(el);
      }
    });
    Array.prototype.forEach.call(collectionOfBodies, (el) => {
      Tabset.hideTabBody(el);
      if (el.dataset.bodyId == index) {
        Tabset.displayTabBody(el);
      }
    });    
  }

  next() {
    const collectionLength = this.getCollectionLength();
    this.index++;
    console.log(this.index);
    if (this.index === collectionLength+1) this.index = 1;
    this.show(this.index);
  }

  prev() {
    const collectionLength = this.getCollectionLength();
    this.index--;
    if(this.index < 1) this.index = collectionLength;
    this.show(this.index);
  }



 onElementClick(e) {  
    if (e.target.classList.contains(TABSET_HEADING_CLASS)) {           
      const headingID = e.target.dataset.headingId;
      this.show(headingID);      
    }
  }
}

const tabSet = new Tabset(document.getElementById('tabset'));

// tabSet.show(2);
//tabSet.next();
// tabSet.prev();


