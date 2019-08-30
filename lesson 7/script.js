'use strict';

const greeting = document.querySelector('#greeting');
const maxNumber = document.querySelector('#max');
const minNumber = document.querySelector('#min');

function userInput(text) {
  let input;

  do {
    input = prompt(text, "");
  } while(!input);

  return input;
}

function displayError() {
  maxNumber.style.width = "200px";
  maxNumber.style.height = "20px";
  maxNumber.style.backgroundColor = "red";
  maxNumber.innerHTML = 'Please, enter correct numbers';  
}

function displayMinAndMax(arr) {
  arr.sort((a, b) => a-b);

  maxNumber.innerHTML = "Maximum number is " + arr[arr.length-1];
  minNumber.innerHTML = "Minimum number is " + arr[0];
}


const name = userInput('What is your name');
greeting.innerHTML = "Hello, " + name;

const numbers = userInput('Please, enter numbers separated by commas');
const arr = numbers.split(',');

const someNan = arr.some(value => isNaN(value));
  if (someNan) {
      displayError();
    } else {
      displayMinAndMax(arr);
}












   