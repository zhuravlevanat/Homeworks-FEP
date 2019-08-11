'use strict';

let operation, 
    firstOperand,
    secondOperand,
    result;  
    
function addTwoNumbers(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function substractTwoNumbers(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function divideTwoNumbers(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function multiplicateTwoNumbers(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

do {
  operation = prompt('Please, choose one operation: add, sub, mult, div', '');
} while (operation !== 'add' &&
         operation !== 'sub' && 
         operation !== 'mult' && 
         operation !== 'div');

do {
  firstOperand = Number(prompt('Please, enter first operand', ''));
}  
while (isNaN(firstOperand)); 

do {
  secondOperand = Number(prompt('Please, enter second operand'));
}  
while (isNaN(secondOperand)); 

switch (operation) {
  case 'add': 
    result = addTwoNumbers(firstOperand, secondOperand);    
    break;
  case 'sub': 
    result = substractTwoNumbers(firstOperand, secondOperand);     
    break;
  case 'mult': 
    result = multiplicateTwoNumbers(firstOperand, secondOperand);   
    break;
  case 'div': 
    result = divideTwoNumbers(firstOperand, secondOperand);       
    break;    
}

alert('Result is '+ result);