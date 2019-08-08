'use strict';

let operation, 
    numberOfOperands,
    result,
    operands = [];   
  
while ((operation !== 'sum') && (operation !== 'sub') 
    && (operation !== 'mult') && (operation !== 'div')) {
  operation = prompt('Please, choose one operation: sum, sub, mult, div');
}

do {
  numberOfOperands = 
  Number(prompt('Please, enter number of operators greater than 0, less than 5'));
}  
while (numberOfOperands < 1 || numberOfOperands > 4); 

for (let i = 0; i < numberOfOperands; i++) {
  while (isNaN(operands[i]) || operands[i]===null || operands[i]===""){    
    operands[i] = prompt(`Please, enter ${numberOfOperands-i} number(s)`);    
  }
}

for (let i = 0; i < operands.length; i++) {
  operands[i]=Number(operands[i]);
}

result = operands[0];
switch (operation) {
  case 'sum': 
    for (let i = 1; i < operands.length; i++) {
      result+=operands[i];
    }      
    break;
  case 'sub': 
    for (let i = 1; i < operands.length; i++) {          
      result -= operands[i];
    }      
    break;
  case 'mult': 
    for (let i = 1; i < operands.length; i++) {
      result*=operands[i];
    }       
    break;
  case 'div': 
    for (let i = 1; i < operands.length; i++) {
      result/=operands[i];
    }       
    break;    
}

alert('Result is '+ result);