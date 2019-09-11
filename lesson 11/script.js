'use strict';

function Student(name, arrMarks) {
  this.name = name;
  this.arrMarks = arrMarks;  
}

Student.prototype.getAverageMark = function(){    
  const totalMarks = this.arrMarks.reduce((total, value) => total + value);
  return +(totalMarks/this.arrMarks.length).toFixed(1);
}     

function getAverageGroupMark(arrStudents) {
  const totalGroupMark = arrStudents.reduce(
                (total, value) => total + value.getAverageMark(), 0);
  return +(totalGroupMark/arrStudents.length).toFixed(1);
}

const students = [ 
  new Student('Student 1', [10,9,8,0,10]), // имя, оценки
  new Student('Student 12', [10,0,8,0,3,4])
 ];

 console.log(students);

 console.log(students[0].getAverageMark());
 console.log(students[1].getAverageMark());

 console.log(getAverageGroupMark(students));