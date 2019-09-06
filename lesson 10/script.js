'use strict';

function createCalculator(initialNumber = 0) {

  return {
    addNumbers: number => initialNumber += number,
    multNumbers: number => initialNumber *= number,
    divNumbers: number => initialNumber /= number,
    subNumbers: number => initialNumber -= number, 
    setNumber: number => initialNumber = number
  }
}

const calcucalor = createCalculator(10); 

console.log(calcucalor.addNumbers(23));
console.log(calcucalor.multNumbers(2));
console.log(calcucalor.divNumbers(2));
console.log(calcucalor.subNumbers(20));
console.log(calcucalor.setNumber(200));
console.log(calcucalor.addNumbers(20));
console.log(calcucalor.subNumbers(20));
console.log(calcucalor.multNumbers(2));
console.log(calcucalor.divNumbers(2));
