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

const name = userInput('What is your name');
const numbers = userInput('Please, enter numbers separated by commas');

const arr = numbers.split(',');

displayMessage(name, arr);

function displayMessage(name, arr) { 
  greeting.innerHTML = "Hello, " + name;
  if (checkNaN(arr)) {
      displayError();
    } else {
      displayMinAndMax(arr);
}

function checkNaN(arr) {
  return arr.some(value => isNaN(value))? true: false;
}

function displayError() {
  maxNumber.style.width = "200px";
  maxNumber.style.height = "20px";
  maxNumber.style.backgroundColor = "red";
  maxNumber.innerHTML = 'Please, enter correct numbers';  
}

function displayMinAndMax(arr) {
  arr.sort(function(a, b) {
    return a-b;
  });

  maxNumber.innerHTML = "Maximum number is " + arr[arr.length-1];
  minNumber.innerHTML = "Minimum number is " + arr[0];
}
}










   