'use strict';

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