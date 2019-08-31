'use strict';

const list = document.getElementById('list');
const inputForNumber = document.getElementById('count');
const buttonAddListItems = document.getElementById('addBtn');

function removeListItems(list) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function validInputNumber(inputNumber) {
  return inputNumber <= 0? false: true;
}

function addListItems(numberOfItems) {    
  for (let i = 0; i < numberOfItems; i++) {
    const li = document.createElement('li');
    li.textContent = i+1;
    list.append(li);
  }
}

buttonAddListItems.addEventListener('click', function(){
  const numberOfListItems = inputForNumber.value;

  if (list.hasChildNodes) {  
    removeListItems(list);
  }

  if (validInputNumber(numberOfListItems)) {
    addListItems(numberOfListItems);
  } else {
    alert('Enter number greater than 0');
    inputForNumber.value = "";
  }
});

