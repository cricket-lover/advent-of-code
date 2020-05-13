const fs = require('fs');
const Computer = require('./computerClass');

const main = function () {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const arrayOfData = data.split(',');
  const computer = new Computer(arrayOfData, 2);
  const result = computer.run(1);
  console.log(result);
};
main();
