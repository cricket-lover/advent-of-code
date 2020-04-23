const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const arrayOfData = data.split(',');

const opcode = function(array) {
  const list = array.map(e => +e);
  list[1] = 23;
	list[2] = 26;
	console.log(100 * list[1] + list[2]);
	
  // const list = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];

  for (let index = 0; index < list.length; index += 4) {
    const element = list[index];

    if (element === 1) {
      list[list[index + 3]] = list[list[index + 2]] + list[list[index + 1]];
    }
    if (element === 2) {
      list[list[index + 3]] = list[list[index + 2]] * list[list[index + 1]];
    }
    if (element === 99) {
      break;
    }
  }

  return list;
};

const result = opcode(arrayOfData);
console.log(result);

fs.writeFileSync('./result.json', JSON.stringify(result, null, 2), 'utf8');
