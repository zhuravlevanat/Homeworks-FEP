'use strict';

function createCalculator(initialValue = 0) {

  return {
    add: value => initialValue += value,
    mult: value => initialValue *= value,
    div: value => initialValue /= value,
    sub: value => initialValue -= value, 
    set: value => initialValue = value
  }
}

const calculator = createCalculator(10); 
console.log(calculator.add(45)); // возвращает 55 
console.log(calculator.sub(45)); // возвращает 10 
console.log(calculator.div(5)); // возвращает 2 
console.log(calculator.mult(5)); // возвращает 10 
console.log(calculator.set(100)); // устанавливает базовое значение в 100 
console.log(calculator.mult(5)); // возвращает 500
