'use strict';

const generateRandomNumber = (min, max) => {
  return Math.round(min + Math.random()*(max - min))
};

function validateUserNumber(userNumber) {
  userNumber = userNumber.trim();    
  if (userNumber < 0 || 
    userNumber > 10 || 
    userNumber ==="" || 
    isNaN(userNumber)) {
    alert('Enter number between 0 and 10');
    return false;       
  }    
  return true;
}

function checkNumber() {  
  do {    
    let userNumber = prompt('What is your guess?', '');

    if (validateUserNumber(userNumber)) {
      userNumber = Number(userNumber);
    } else continue; 
    
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
alert 
    (`  I have number between 0 and 10. You have to guess my number. 
    I'll help you and I'll tell you if it's too high or too low, or correct. 
    For every correct number you'll have 10 points. 
    In the end I'll show you all your scores. 
    Good luck!!! Let\`s start`);

let points = 0;
const guessedNumber = generateRandomNumber(0, 10);  
checkNumber();  
  


