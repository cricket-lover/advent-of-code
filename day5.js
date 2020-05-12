const fs = require('fs');
const Computer = require('./computerClass');

const data = fs.readFileSync('./input.txt', 'utf8');
const arrayOfData = data.split(',');
const computer = new Computer(arrayOfData, 5);
const result = computer.run();
console.log(result);
