'use strict';

let name;
let numbers;

const greeting = document.querySelector('#greeting');
const maxNumber = document.querySelector('#max');
const minNumber = document.querySelector('#min');


do {
  name = prompt('What is your name', '');
  }  
while (!name); 

greeting.innerHTML = 'Hello, ' + name;

do {
  numbers = prompt('Please, enter numbers separated by commas', '');
  }  
while (!numbers); 

validateNumbers(numbers);


function validateNumbers (numbers) {
  const arr = numbers.split(',');
  const notNumber = arr.some(value => isNaN(value));

  if (notNumber) {
    maxNumber.style.width = "200px";
    maxNumber.style.height = "20px";
    maxNumber.style.backgroundColor = "red";
    maxNumber.innerHTML = 'Please, enter correct numbers';
    
    minNumber.style.backgroundColor = "red"; 
  } else {
    arr.sort(function(a, b) {
      return a-b;
    });

    maxNumber.innerHTML = "Maximum number is " + arr[arr.length-1];
    minNumber.innerHTML = "Minimum number is " + arr[0];
  }




  console.log(notNumber);
 

}









   