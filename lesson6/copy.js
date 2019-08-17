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
