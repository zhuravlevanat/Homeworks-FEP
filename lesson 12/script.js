'use strict';

function Hamburger(size, stuffing) {
  this.size = size;
  this.stuffing = stuffing;
  this.topping = [];
}

Hamburger.SIZE_SMALL = {
  price: 50,
  calories: 20
};
Hamburger.SIZE_BIG = {
  price: 100,
  calories: 40
};
Hamburger.STUFFING_CHEESE = {
  price: 10,
  calories: 20
};
Hamburger.STUFFING_SALAD = {
  price: 20,
  calories: 5
};
Hamburger.STUFFING_POTATO = {
  price: 15,
  calories: 10
};
Hamburger.TOPPING_SAUCE = {
  price: 15,
  calories: 0
};
Hamburger.TOPPING_MAYO = {
  price: 20,
  calories: 5
};

Hamburger.prototype.getToppings = function () {
  return this.topping;
}

Hamburger.prototype.getStuffing = function () {
  return this.stuffing;
}
Hamburger.prototype.getSize = function () {
  return this.size;
}

Hamburger.prototype.addTopping = function(topping) {
  this.topping.push(topping);
}

Hamburger.prototype.calculateCalories = function(){
  let totalCalories = 
              this.getSize().calories + this.getStuffing().calories;
  
  if (this.topping) {
    totalCalories += 
              this.topping.reduce((sum, elem) => sum + elem.calories, 0);    
  }
  return totalCalories;
}

Hamburger.prototype.calculatePrice = function(){
  let totalPrize = this.getSize().price + this.getStuffing().price;
  
  if (this.topping) {
    totalPrize += 
              this.topping.reduce((sum, elem) => sum + elem.price, 0);    
  }
  return totalPrize;
}



// маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза

console.log(hamburger);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log('Calories: ' + hamburger.calculateCalories());
// сколько стоит
console.log('Price: ' + hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SAUCE);
// А сколько теперь стоит?
console.log('Price with sauce: ' + hamburger.calculatePrice());
