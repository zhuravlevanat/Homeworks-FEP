'use strict';

function replaceAll(string, replaceableChar, charToReplace) {
   if ((replaceableChar.length !== 1) || (charToReplace.length !== 1)) {
    alert('You should enter only one symbol');
  } else {
    for (let i=0; i<string.length; i++){
      if (string[i] === replaceableChar) {
        string = string.replace(string[i], charToReplace)
      }
    }    
  }
  return string;
}

const newString = replaceAll('Hello world', 'l', 'z');

console.log(newString);

function replaceAllRecursion(string, replaceableChar, charToReplace, index) {
  let currentIndex = index || 0;
  if ((replaceableChar.length !== 1) || (charToReplace.length !== 1)) {
   alert('You should enter only one symbol');
 } else {
   let modifiedString = (string[currentIndex] === replaceableChar) ? 
   string.replace(string[currentIndex], charToReplace) : string;
   if (currentIndex < modifiedString.length) {
     modifiedString = replaceAllRecursion(modifiedString, replaceableChar, charToReplace, ++currentIndex);
   }
   return modifiedString;
 }
 
}

const newStringWithRecursion = replaceAllRecursion('Hello world', 'l', 'z', 0);

console.log(newStringWithRecursion);

