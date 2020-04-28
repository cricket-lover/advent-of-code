const fs = require('fs');

let result = [];
const data = fs
  .readFileSync('./input.txt', 'utf8')
  .split('')
  .map((e) => +e);
const numberPerLayer = 25 * 6;

for (let i = 0; i < data.length; i += numberPerLayer) {
  const temp = data.slice(i, i + numberPerLayer);
  result.push(temp);
}

const countZeroes = function (context, element) {
  if (element === 0) {
    context++;
  }
  return context;
};

const countOnes = function (context, element) {
  if (element === 1) {
    context++;
  }
  return context;
};

const countTwos = function (context, element) {
  if (element === 2) {
    context++;
  }
  return context;
};

result = result.filter((e) => e.includes(0));
const zeroArray = result.map((e) => {
  return e.reduce(countZeroes, 0);
});
const leastIndex = zeroArray.findIndex((e) => e === Math.min(...zeroArray));
const requiredLayer = result[leastIndex];
const ones = requiredLayer.reduce(countOnes, 0);
const twos = requiredLayer.reduce(countTwos, 0);
console.log(ones * twos);
