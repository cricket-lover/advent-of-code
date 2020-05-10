const fs = require('fs');

let result = [];
const data = fs
  .readFileSync('./input.txt', 'utf8')
  .split('')
  .map((e) => +e);
// const data = '123456789012'.split('').map((e) => +e);
const numberPerLayer = 25 * 6;
for (let i = 0; i < data.length; i += numberPerLayer) {
  const temp = data.slice(i, i + numberPerLayer);
  result.push(temp);
}

const findColor = function (list, position, index) {
  if (list[index][position] != 2) {
    return list[index][position];
  }
  index += 1;
  return findColor(list, position, index);
};

let final = result[0].map((e, i) => {
  if (e === 2) {
    e = findColor(result, i, 1);
    // let index = 0;
    // while(result[index])
  }
  return e;
});
for (let index = 24; index < numberPerLayer; index += 25) {
  final[index] = '\n';
}
final = final.join('');
final = final.replace(/0/gi, ' ');
final = final.replace(/1/gi, '#');


console.log(final);
