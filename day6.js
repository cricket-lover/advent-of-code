const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');
let arrayOfData = data.split('\n');

const resultObject = {};
const resultArray = [];

arrayOfData.forEach((element) => {
  const [key, value] = element.split(')');
  resultObject[value] = key;
});

arrayOfData.forEach((element) => {
  const [key, value] = element.split(')');
  resultArray.push([value, key]);
});

const getValue = function (list, key) {
  const keys = Object.keys(list);
  if (!keys.includes(key)) {
    return value;
  }
  value = list[key];
  return getValue(list, value);
};

const mainRow = [];
resultObject['B'] = -1;

const getMainRow = function (list, key) {
  const filtered = list.find((e) => e[1] === key);
  if (filtered === undefined) {
    return;
  }
  mainRow.push(filtered[0]);
  return getMainRow(list, filtered[0]);
};

getMainRow(resultArray, 'COM');

mainRow.forEach((e) => {
  const temp = getValue(resultObject, e);
  resultObject[e] = 1 + temp;
});

const mainValues = mainRow.map((e) => resultObject[e]);
const mainSum = mainValues.reduce((e, c) => (c += e), 0);
// const sum = function (context, element) {
//   context += element;
//   return context;
// };

// console.log(resultObject);

for (const key in resultObject) {
  if (resultObject.hasOwnProperty(key)) {
    const value = getValue(resultObject, key);
    resultObject[key] = 1 + value;
  }
}

// let values = Object.values(resultObject);
// values = values.map((e) => +e);
// const total = values.reduce((e, c) => (c += e), 0);
// console.log(total);
// console.log(mainRow, mainValues);

let arr = Object.values(resultObject);

arr = arr.map((e) => {
  let result = e;
  if (typeof e == 'string') {
    let some = e.replace('COM', 0);
    some = some.split('');
    some = some.map((e) => +e);
    result = some.reduce((e, c) => (c += e), 0);
  }
  return result;
});

const total = arr.reduce((e, c) => (c += e), 0);
console.log(total);
