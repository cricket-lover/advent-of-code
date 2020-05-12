const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');
let arrayOfData = data.split('\n');

const orbits = {};

arrayOfData = arrayOfData.map((e) => {
  const values = e.split(')');
  return values;
});

arrayOfData.forEach((e) => {
  const keys = Object.keys(orbits);
  if (keys.includes(e[1])) {
    orbits[e[1]].push(e[0]);
    return;
  }
  orbits[e[1]] = [e[0]];
});

const getPath = function (orbits, key, element) {
  unique.push(key);
  if (key === orbits[element][0]) {
    return;
  }
  key = orbits[key][0];
  return getPath(orbits, key, element);
};

const common1 = [];
const common2 = [];
const getCommonPath = function (orbits, key, destination) {
  if (key === 'COM') {
    return;
  }
  destination.push(key);
  key = orbits[key][0];
  return getCommonPath(orbits, key, destination);
};
const unique = [];
getCommonPath(orbits, orbits['YOU'][0], common1);
getCommonPath(orbits, orbits['SAN'][0], common2);
const getUniquePath = function (path1, path2) {
  const length = Math.max(path1.length, path2.length);
  let index = 0;
  do {
    unique.push(path1[index]);
    index++;
  } while (!path2.includes(path1[index]) && index < length);
};
getUniquePath(common1, common2);
const last = unique[unique.length - 1];
getPath(orbits, orbits['SAN'][0], last);
console.log(unique.length - 1);
