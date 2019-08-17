'use strict';

function copy(obj) {
  const copyOfObj = {}; 

  for (let prop in obj) {
    if (typeof obj[prop] !== 'object') {
      copyOfObj[prop] = obj[prop];
    } else {
      copyOfObj[prop] = copy(obj[prop]);
    }
  }
  return copyOfObj;   
}

const person = {
  name: 'Matt',
  age: 25,
  address: {
    city: 'Dnipro',
    street: 'Kabardinska',
  }
};

const teacher = copy(person);

teacher.address.city = 'Kyiv';

console.log(person, teacher);



function numberGuesser() {
  alert 
  (`  I have number between 0 and 10. You have to guess my number. 
  I'll help you and I'll tell you if it's too high or too low, or correct. 
  For every correct number you'll have 10 points. 
  In the end I'll show you all your scores. 
  Good luck!!! Let\`s start`);

 const checkNumber = function () {
  let points = 0;
  const randomNumber = (min, max) => Math.round(min + Math.random()*(max - min));
  const guessedNumber = randomNumber(0, 10);
  
  do {    
    let userNumber = prompt('What is your guess?', '');
    if (userNumber === null) break;
    userNumber = userNumber.trim();    
    if (userNumber < 0 || userNumber > 10 || userNumber ==="" || isNaN(userNumber)) {
      alert('Enter number between 0 and 10'); 
      continue;
    }    
    userNumber = Number(userNumber);
    if (userNumber === guessedNumber) {
      points+=10;  
      alert ('You are right! The guessed number was '+ guessedNumber);    
      break;  
    } else if (userNumber > guessedNumber) {
      alert('It\'s too high. Try once more!'); continue;
    } else {
      alert('It\'s too low. Try once more!'); continue;
    } 
  } while (true);

  const confirmationToContinue = confirm('Do you want to continue');
  if (confirmationToContinue) {
    checkNumber();
  } else {
    return alert('Total score: ' + points);
  }
} 
checkNumber();
}

numberGuesser();

function getNumberOfEvenNumbers() {
  let userNumber;
  let numbers;
  let numberOfEvenNumbers = 0;  
  do {
    userNumber = prompt('Please, enter your number', '');
  } while (isNaN(userNumber) || userNumber ==="" || userNumber===null);

  numbers = userNumber.split('');
  numbers.forEach(function(value) {
    if (value % 2 === 0) {
      numberOfEvenNumbers += 1;
    }
  })
  return alert('Number of even numbers is ' + numberOfEvenNumbers);  
}

getNumberOfEvenNumbers();
