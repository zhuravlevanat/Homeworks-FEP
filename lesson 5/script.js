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

// function replaceAll(string, replaceableChar, charToReplace) {
//   if ((replaceableChar.length !== 1) || (charToReplace.length !== 1)) {
//     alert('You should enter only one symbol');
//   } else {
//     if (string.length !== 0) {
//       string = string.replace(string[i], charToReplace)
//     if (string[length] === replaceableChar) {
//          replaceAll(string, replaceableChar, charToReplace)
//       //         
//       //       }
//   }
//     }
//   }
//   return string;
// }

// const newString = replaceAll('Hello world', 'li', 'z');

// console.log(newString);