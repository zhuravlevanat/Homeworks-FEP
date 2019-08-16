'use strict';

// function copyObject(obj) {
//   const copyOfObj = {}; 

//   for (let prop in obj) {
//     if (typeof obj[prop] !== 'object') {
//       copyOfObj[prop] = obj[prop];
//     } else {
//       copyOfObj[prop] = copyObject(obj[prop]);
//     }
//   }
//   return copyOfObj;   
// }

// const person = {
//   name: 'Matt',
//   age: 25,
//   address: {
//     city: 'Dnipro',
//     street: 'Kabardinska',
//   }
// };

// const teacher = copyObject(person);

// teacher.address.city = 'Kyiv';

// console.log(person, teacher);

function cazino() {
  let points = 0;
  let userNumber;
  let randomNumber;
  let guessedNumber;

  
  alert 
  (`  I have number between 0 and 10. You have to guess my number. 
  I'll help you and I'll tell you if it's too high or too low, or correct. 
  For every correct number you'll have 10 points. 
  In the end I'll show you all your scores. 
  Good luck!!! Let\`s start`);

 const checkNumber= function () {
  randomNumber = (min, max) => Math.round(min + Math.random()*(max - min));
  guessedNumber = randomNumber(0, 10);
  console.log(guessedNumber);
  do {    
    userNumber = +prompt('What is your guess?', '');
    if (userNumber === guessedNumber) {
        points+=10;  
        alert ('You are rigth! The guessed number was '+ guessedNumber);    
        break;  
      } else if (userNumber > guessedNumber) {
          alert('It\'s too high. Try once more!'); continue;
      } else if(userNumber < guessedNumber) {
          alert('It\'s too low. Try once more!'); continue;
        } 
    } while (userNumber);

    const confirmationTocontinue = confirm('Do you want to continue');
    if (confirmationTocontinue) {
      checkNumber();
    } else alert('Total score: ' + points);
  } 
 

checkNumber();
}




 

cazino();