'use strict';
let operation, 
    numberOfOperands,
    result,
    operands = [];   
  
while (!(operation === 'sum') && !(operation === 'sub') 
    && !(operation === 'mult') && !(operation === 'div')) {
  operation = prompt('Please, choose one operation: sum, sub, mult, div');
}
do {
  numberOfOperands = 
  Number(prompt('Please, enter number of operators greater than 0, less than 5'));
}  
while (numberOfOperands < 1 || numberOfOperands > 4) 

for (let i = 0; i < numberOfOperands; i++) {
  while (isNaN(operands[i]) || !operands[i]){
  operands[i] = Number(prompt(`Please, enter ${numberOfOperands-i} numbers`));
  }
}

if (numberOfOperands === 1) {
  result = operands;
} else {
  switch (operation) {
    case 'sum': 
      result = 0;
      for (let i=0; i<operands.length; i++) {
        result+=operands[i];
      }      
      break;
    case 'sub': 
      result = operands[0];
      for (let i=1; i<operands.length; i++) {          
        result -= operands[i];
      }      
      break;
    case 'mult': 
      result = 1;
      for (let i=0; i<operands.length; i++) {
        result*=operands[i];
      }       
      break;
    case 'div': 
      result = 1;
      for (let i=0; i<operands.length; i++) {
        result/=operands[i];
      }       
      break;    
  }
}
alert('Result is '+ result);